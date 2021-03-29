import { Avatar, IconButton} from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import { ImportExportOutlined, InsertEmoticon, SearchOutlined} from "@material-ui/icons";
import { AttachFile } from "@material-ui/icons";
import React, {useState , useEffect} from "react";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import SidebarChat from "./SidebarChat";




function Chat() {
  const [input,setInput] =useState("");
  const [seed, setSeed] = useState("");
  const {roomId} =useParams();
  const [roomName, setRoomName] = useState("");
  const [roomURL, setRoomURL] = useState("");
  const [messages, setMessages] =useState([]);
  const [{ user }, dispatch] = useStateValue();

 // Agregado 




  //Agregado

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName
        (snapshot.data().nombre));
      
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomURL
        (snapshot.data().url));

      
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) =>
          doc.data()))
        );
      
    }
  }, [roomId]);


  useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage =(e) => {
    e.preventDefault();
    console.log("Escribiste >>>",input); 
    setInput("");

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      nombre: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),


    })

  }
  
    return (
      <div className="chat">
          <div className="chat__header">
          <Avatar src={roomURL} />

            <div className="chat__headerInfo">
              <h3>{roomName}</h3>
              <p>
                Last Seen at{" "}
                {new Date(
                    messages[messages.length-1]?.timestamp?.toDate()
                ).toUTCString()}              
              </p>
            </div>

             

            <div className="chat__headerRight">
                <IconButton>
                  <SearchOutlined/>     
                </IconButton>
                
                <IconButton>
                  <AttachFile />
                </IconButton>
                        
                <IconButton>
                  <MoreVert/>
                </IconButton>

            </div>
          </div>

          <div className="chat__body">
            {messages.map(message => (
              <p 
                className={`chat__mesagge ${message.nombre === user.displayName &&
                "chat__reciever"}`}>
                <span className="chat__name">
                  {message.nombre}
                </span>
                {message.message}
                <span className="chat__timestamp">
                  {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              
              </p>

            ))}
            
            
          </div>

          <div className="chat__footer">
            <IconButton>
              <InsertEmoticon/>
            </IconButton>
            <form>
              <input value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Escribe un mensaje aquí" type="text"/>
              <button onClick={sendMessage}
               type="submit">Enviar</button>
            </form>
            <MicIcon />
              
          </div>
      </div>

    )

}

export default Chat;