import './App.css';
import { useEffect, useState } from 'react'
import Chessboard from './Chessboard.js'
import Connector from './Connector.js'
import io from 'socket.io-client'


function App() {
  const [socket,setSocket] = useState();
  const [isHost,setIsHost] = useState(false);
  const [isWhite,setIsWhite] = useState(true);
  const [room,setRoom] = useState("");


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
    console.log(r);
    socket.emit("join", {room: r});
  }

  useEffect(() => {
    if(socket !== undefined) {
      socket.on('color', data => setIsWhite(!data))
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
      <Chessboard isWhite={isWhite} setIsWhite={setIsWhite} isHost={isHost} room={room} socket={socket} />
      <Connector joinRoom={joinRoom} createRoom={createRoom} unhost={unhost} room={room} socket={socket} />
    </div>
  );
}

export default App;

