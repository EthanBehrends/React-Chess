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
        <h1>React Chess</h1>
        <h2>Built by Ethan Behrends</h2>
        <h3>Spring 2021</h3>
        <h4>Built with:</h4>
        <ul>
          <li>React.js</li>
          <li>Socket.IO</li>
          <li>Node.js</li>
        </ul>
        <h4>About the project:</h4>
        <p>This project was a fun exercise. I've always loved playing chess, so creating an online-multiplayer version from the ground up was a great experience.</p>
        <p>The main objective of the project was not only to showcase my React skills, but also to learn and apply Socket.IO for the first time in a project of my own. I found Socket.IO to be incredibly intuitive, and I will absolutely be using it in future projects.</p>
        <p>I also felt as though it would be a fun challenge to build my own chess engine from scratch as opposed to using an available library. While challenging at times, it was a worthwhile experience.</p>
        <p>While some rules from the standard game of chess are missing, I may return to this project and add some of these in the feature (En Passant, Castling, Pawn Promotion, Timed matches, etc.)</p>
      </AboutPanel>
      <div id="credit">Created by Ethan Behrends</div>
    </div>
  );
}

export default App;

