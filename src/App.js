import './App.css';
import { useEffect, useState } from 'react'
import Chessboard from './Chessboard.js'
import io from 'socket.io-client'


function App() {
  const [socket,setSocket] = useState();
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    }
  },[])

  return (
    <div id="wrapper">
      <Chessboard socket={socket} />
    </div>
  );
}

export default App;
