import {useEffect, useState, useRef} from 'react'
import './Connector.css'

function generateCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}


export default function Connector(props) {
    const [formCode, setFormCode] = useState("");

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

    const [menu, setMenu] = useState('main');

    useEffect(() => {
        if(props.socket !== undefined) {
            props.socket.on('joined', data => {
                setMenu('clear');
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
            case 'clear':
                return null;
            default:
                break;
            }
}

