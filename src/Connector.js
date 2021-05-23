import {useEffect, useState, useRef} from 'react'
import './Connector.css'

function generateCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}


export default function Connector(props) {
    const [formCode, setFormCode] = useState("");

    function rematch() {
        if(oppRematch) {
            props.socket.emit("rematchAcc", {room: props.room});
        }
        else {
            props.socket.emit("rematchReq", {room: props.room})
        }
    }

    function MainMenu() {
        return (
            <div id="connectorPopup">
                <div className="button" onClick={() => {props.createRoom(generateCode()); setMenu('hosting');}}>
                    Host Game
                </div>
                <div className="button" onClick={() => setMenu('join')}>
                    Join Game
                </div>
            </div>
        )
    }
    
    function Hosting() {
        return (
            <div id="connectorPopup">
                <h1>{props.room}</h1>
                <h4>Waiting for other player</h4>
            </div>
        )
    }

    function rematchPromp (tagline) {
        return (
            <div id="connectorPopup">
                <h1>{tagline}</h1>
                <button>Rematch</button>
                <button>New Game</button>
            </div>
        )
    } 

    function Join() {
        const roomRef = useRef(null);

        useEffect(() => {
            roomRef.current.focus();
        },[]);

        return(
            <div id="connectorPopup">
                <div id="back" onClick={() => setMenu('main')}></div>
                <h2>Join a Game</h2>
                <form onSubmit={event => {props.joinRoom(formCode);event.preventDefault()}}>
                    <input ref={roomRef} name="room" key="text" type="textarea" value={formCode} onChange={event => {setFormCode(event.target.value)}} placeholder="Enter code"></input>
                    <input type="submit" value="Join"></input>
                </form>
            </div>
        )
    }
    const [oppRematch, setOppRematch] = useState(false);
    const [menu, setMenu] = useState('main');
    const [tagline, setTagline] = useState("");

    useEffect(() => {
        if(props.socket !== undefined) {
            props.socket.on('joined', data => {
                setMenu('clear');
            });
            props.socket.on("gameover", data => {
                setTagline(data);
                setMenu('gameover');
            });
            props.socket.on("rematchRequested", data => {
                setOppRematch(true);
            });
            props.socket.on("startMatch", data => {
                setOppRematch(false);
                setMenu('clear');
            });
            props.socket.on('disconnected', data => {
                setMenu('opponentLeft');
            });
        }
    })

            switch (menu) {
            case 'main':
                return(<MainMenu />)
                break;
            case 'hosting':
                return(<Hosting />)
                break;
            case 'join':
                return(<Join />)
                break;
            case 'opponentLeft':
                return(
                    <div id="connectorPopup">
                        Opponent left the match, click here to refresh the page.
                        <button onClick={() => {window.location.reload()}}>Reload</button>
                    </div>
                )
                break;
            case 'gameover': 
                return(
                    <div id="connectorPopup">
                        <h2>{tagline}</h2>
                        <button onClick={rematch}>Rematch</button>
                    </div>
                )
                break;
            case 'clear':
                return null;
                break;
            default:
                break;
            }
}

