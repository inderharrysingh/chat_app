import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client';

import './App.css'

const URL = "http://localhost:3000/";

function useWebSocket(){

  const [url, seturl] = useState<string>(URL);
  const socketRef = useRef<any>(null);
  const [latestMessage , setLatestMessage ] = useState("");

  useEffect( () => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on("connect", () => {
        console.log("connected");
    })

    socket.on("message" , (msg) => {
        console.log(msg);
        setLatestMessage(msg);
    })

    socket.on("disconnect", () => {
        console.log("disconnected");
    });

    return () => { socket.close(); }
  }, [url])

  return {socketRef, latestMessage};

}



function App() {
  const [ messages , addMessages ] = useState<string[]>([]);
  const [ text , setText ] = useState<string>("");
  const { socketRef, latestMessage } = useWebSocket();
  const socket = socketRef.current;
  
  function sendMessage(){
    socket.emit("message", text);
    addMessages( (e) => [...e, text]);
  }

  return (
    <>
          <div> { messages.map((msg, index) => {
                return ( <div key={index}>{msg}</div>)
            })}</div>
          <h1>{ latestMessage }</h1>
          <input value={text}  onChange={ (e) => { setText(e.target.value) }} title='input' type='text'></input>
          <button onClick={() => {sendMessage()}}> Send</button>
    </>
    
  )

}

export default App
