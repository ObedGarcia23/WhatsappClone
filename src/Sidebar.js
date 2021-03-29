import React, { useEffect, useState } from "react";
import './Sidebar.css';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined} from "@material-ui/icons";
import SidebarChat from './SidebarChat';
import db from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStateValue } from "./StateProvider";


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [logout, setLogout] = useState(false);
    const [{ user }, dispatch] = useStateValue();
  
    const exitApp = () => {
        localStorage.removeItem("uid");
        window.location.reload();
        setLogout(true);
      };


    useEffect(() => {
      const unsubscribe = db.collection("rooms").onSnapshot(function (snapshot) {
              return setRooms(
                  snapshot.docs.map((doc) => ({
                      id: doc.id,
                      data: doc.data(),
                      url:doc.url,
                  }))

              );
          }
            
        );
        return () => {
            unsubscribe();
        }
        
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>     
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <div onClick={exitApp}>
                            <ExitToAppIcon />
                        </div>
                     </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Buscar o empezar un chat nuevo" type="text" />

                </div>
            </div>

            <div className="sidebar__chats">
            <SidebarChat addNewChat />
            {rooms.map((room) => (
                <SidebarChat key={room.id} id={room.id}
                nombre={room.data.nombre} url={room.data.url} />
            ))}

          

            </div>

        </div>
    )
}

export default Sidebar;
