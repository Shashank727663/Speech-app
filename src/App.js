import React, { useState,useEffect } from 'react';
import './App.css';
import { FormattedMessage } from 'react-intl';
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const mic=new SpeechRecognition()
mic.continious=true;
mic.interimResults=true;
mic.lang='en-us'; 


function App() {
  var voices=[];
 
  const [isListening,setisListening]=useState(false);
  const[note,setnote]=useState(null);
  const[save,setsave]=useState([]);
  



  
useEffect(()=>{
  handleListen()
},[isListening])
  const handleListen=()=>{
    if(isListening){
      mic.start();
      mic.onend=()=>{
        console.log(`continue`)
        mic.start()
      }
    }

    else{
      mic.stop();
      mic.onend=()=>{
        console.log(`stopped mic on click`);
      }
    }
    mic.onstart=()=>{
      console.log(`mic on`)
    }

    mic.onresult=event=>{
      const transcript=Array.from(event.results)
      .map(result => result[0])
      .map(result=>result.transcript)
      .join('')
      console.log(transcript)
      voices.push(transcript)
      setnote(transcript)
      mic.onerror=event=>{
        console.log(event.error);
      }

    }
  }
  
const handleSaveNote=()=>{
  setsave([...save,note])
  setnote('')
}



  return (
    <>
    <h1>Voice Notes</h1>
   <div className='container'>
   <div className='box'>
    <h2>Current Note</h2>
    {isListening ? <span>🎤</span>:<span>🛑🎤</span>}
    <button onClick={handleSaveNote} disabled={!note}>Save Note</button>
    <button onClick={()=>setisListening(prevState=>!prevState)}>Start/Stop</button>
    <p>{note}</p>
   
   </div>

   <div className='box'>
   <h2>Notes</h2>
   {save.map(n=>
   <p key={n} >{n}</p>)}
   </div>
    </div>
    </>
  );
}

export default App;
