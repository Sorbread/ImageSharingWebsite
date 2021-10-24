import './App.css';
import {useState,useEffect} from "react";
import io from 'socket.io-client';
import Chat from './Chat';
import Rooms from './Rooms';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  return (
    <div className="App">
      <h1>Chat App</h1>
      {username !== "" && room !== "" ? <Chat socket={socket} name={"woosh"} id ={socket.id}/> : <Rooms />}
    
    </div>
  );
}

export default App;
