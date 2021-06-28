import './App.css';
import { useEffect, useState } from 'react'
import Chessboard from './Chessboard.js'
import Connector from './Connector.js'
import TurnMarker from './TurnMarker.js'
import AboutPanel from './AboutPanel.js'
import io from 'socket.io-client'


function App() {
  const [socket,setSocket] = useState();
  const [isHost,setIsHost] = useState(false);
  const [isWhite,setIsWhite] = useState(true);
  const [room,setRoom] = useState("");
  const [isTurn, setIsTurn] = useState(true);
  const [isActive, setIsActive] = useState(false);


  function createRoom(r) {
    const white = Math.random() > .5;
    setRoom(r);
    setIsWhite(white);
    setIsHost(true);
    socket.emit("host",{room: r, hostIsWhite: white});
  }

  function unhost() {
    socket.emit("unhost", {room: room});
    setRoom("");
  }

  function joinRoom(r) {
    setRoom(r);
    setIsHost(false);
    socket.emit("join", {room: r});
  }

  useEffect(() => {
    function checkIsHost() {
      return isHost;
    }
    if(socket !== undefined) {
      socket.on('color', data => setIsWhite(!data))
      socket.on("startMatch", data => {
        setIsWhite(data.hostIsWhite === checkIsHost());
      });
    }
  })

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    }
  },[])

  return (
    <div id="wrapper">
      <Chessboard isWhite={isWhite} setIsTurn={setIsTurn} setIsActive={setIsActive} setIsWhite={setIsWhite} isHost={isHost} room={room} socket={socket} />
      <Connector joinRoom={joinRoom} createRoom={createRoom} unhost={unhost} room={room} socket={socket} />
      <TurnMarker isTurn={isTurn} isActive={isActive} />
      <AboutPanel>
      <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida tortor nunc, at pulvinar dui hendrerit eget. Donec luctus ex eget sem vestibulum porttitor. Duis rhoncus lorem odio, ac varius urna dapibus eu. Aliquam vitae sem condimentum, pellentesque diam in, dictum erat. Duis finibus mi ut justo consectetur, vitae consequat orci maximus. Donec posuere, justo quis egestas porta, ante turpis ornare sapien, ut volutpat diam nulla in odio. Quisque varius, ante quis porttitor lacinia, mauris magna malesuada metus, aliquet congue mauris sem in neque. Sed eget justo lorem. Curabitur sollicitudin sodales bibendum.
                </p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida tortor nunc, at pulvinar dui hendrerit eget. Donec luctus ex eget sem vestibulum porttitor. Duis rhoncus lorem odio, ac varius urna dapibus eu. Aliquam vitae sem condimentum, pellentesque diam in, dictum erat. Duis finibus mi ut justo consectetur, vitae consequat orci maximus. Donec posuere, justo quis egestas porta, ante turpis ornare sapien, ut volutpat diam nulla in odio. Quisque varius, ante quis porttitor lacinia, mauris magna malesuada metus, aliquet congue mauris sem in neque. Sed eget justo lorem. Curabitur sollicitudin sodales bibendum.
                </p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida tortor nunc, at pulvinar dui hendrerit eget. Donec luctus ex eget sem vestibulum porttitor. Duis rhoncus lorem odio, ac varius urna dapibus eu. Aliquam vitae sem condimentum, pellentesque diam in, dictum erat. Duis finibus mi ut justo consectetur, vitae consequat orci maximus. Donec posuere, justo quis egestas porta, ante turpis ornare sapien, ut volutpat diam nulla in odio. Quisque varius, ante quis porttitor lacinia, mauris magna malesuada metus, aliquet congue mauris sem in neque. Sed eget justo lorem. Curabitur sollicitudin sodales bibendum.
                </p>
      </AboutPanel>
    </div>
  );
}

export default App;

