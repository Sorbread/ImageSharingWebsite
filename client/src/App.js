import './App.css';
import {useState} from "react";
import io from 'socket.io-client';
import Chat from './Chat';
import Rooms from './Rooms';
import SetUsername from './SetUsername';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState(0);

  const change_room = (room_id) => {
    setroom(room_id)
  }

  const changeUsername = (ev) => {
    setusername(ev.target.value)
  }

  return (
    <div className="App">
      <h1>Chat App</h1>
      {username !== "" && room !== 0 ? <Chat socket={socket} name={username} id ={socket.id} room={room}/> : <div>
        <Rooms setroom={change_room}/>
        <SetUsername changeUsername={changeUsername}/>
        </div>}

    </div>
  );
}

export default App;
