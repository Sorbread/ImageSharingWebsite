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
  const [submitted, setsubmitted] = useState(false)

  const change_room = (room_id) => {
    setroom(room_id)
  }

  const changeUsername = (ev) => {
    setusername(ev.target.value)
  }

  const submit = () => {
    if (username !== "" && room !== 0) {
      socket.emit("join_room",{
        room: room
      })
      setsubmitted(true);
    }
  }

  return (
    <div className="App">
      <h1>Chat App</h1>
      {submitted ? <Chat socket={socket} name={username} id ={socket.id} room={room}/> : <div>
        <Rooms setroom={change_room}/>
        <SetUsername changeUsername={changeUsername} submit={submit}/>
        </div>}

    </div>
  );
}

export default App;
