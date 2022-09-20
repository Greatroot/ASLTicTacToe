import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
    // Room State
    const [room, setRoom] = useState("");

    // Message State
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
      // How to send data data to the server
        // You can specify which room you want to emit the event to.
        socket.emit("send_message", {message, room});
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // alert(data.message);  // Recall we made this object.
            setMessageReceived(data.message);
        });
    }, [socket])  // i.e. run everytime our socket receives data from server

    return (
        <div className="App">
            <h4>Join a room!</h4>
            <input placeholder="Room Number..." onChange={(event) => {
                setRoom(event.target.value);
            }}
            />
            <button onClick={joinRoom}>Join Room</button>
            <h4>Send a message!</h4>
          <input placeholder="Message..." onChange={(event) => {
              setMessage(event.target.value);
          }}
          />
          <button onClick={sendMessage}>Send Message</button>
            <h1>Message:</h1>
            {messageReceived}
        </div>
        );
}

export default App;
