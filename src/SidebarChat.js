import React, { useEffect, useState } from "react";
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import {Link} from "react-router-dom";



function SidebarChat({id, nombre, url, addNewChat }) { 
    const [seed, setSeed] = useState("");
    const [messages, setMessages] =useState([]);

    

    useEffect(() => {
        if (id) {
          db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) =>
                doc.data()))
            );
        }

    }, [id]);

  
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

   
    // Funcion que muestra una alerta en el navegador y agrega el valor a la base de datos Firebase
    const createChat = () => {
        const roomName = prompt("Ingrese un nombre para chatear");
        if(roomName){
            // Agregar nombres a las bases de datos
            db.collection("rooms").add({
                nombre: roomName,
            });
        }
    };

    return !addNewChat ? ( 
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={url} />
                <div className="sidebarChat__info">
                    <h2>{nombre}</h2>
                    <p> {messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
    
     
     // <div onClick={createChat}
       //className="sidebarChat">
       <h2></h2>
    //</div>
        
    );
}

export default SidebarChat
