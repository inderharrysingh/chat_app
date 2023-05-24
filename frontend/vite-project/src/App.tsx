import { useState, useEffect } from 'react'
import './App.css'
import useWebSocket, { ReadyState } from 'react-use-websocket';


const URL = "wss://echo.websocket.events";

const connectionStatus = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

function App() {
  const [ messages , addMessages ] = useState<string[]>([]);
  const [ text , setText ] = useState<string>("");
  const { lastMessage , sendMessage , readyState } = useWebSocket(URL);

  function sendToServer(){
      sendMessage(text);
      addMessages( (prev : string[] ) => [...prev, text] );
      setText("")
  }

  useEffect( () => {

    lastMessage && console.log(lastMessage.data);

  }, [lastMessage])


  return (
    <>
    <div>State of Connection : { connectionStatus[readyState] }</div>
    <div>
      {
       messages && messages.map( (msg) => {
        return ( <div>{msg}</div>)
      }) 
      }
    </div>
      <input value={text} onChange={(e) => { setText(e.target.value)}} type='text' title='input'></input>
      <button  onClick={() => sendToServer() }>Send</button>
    </>
  )
}

export default App
