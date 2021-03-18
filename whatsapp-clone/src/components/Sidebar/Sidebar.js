import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import css from "./Sidebar.module.css";
import SidebarChat from "./SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../Context/StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unSubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => unSubscribe();
  }, []);

  return (
    <div className={css.sidebar}>
      <div className={css.sidebarHeader}>
        <Avatar src={user?.photoURL} />

        <div className={css.sidebarHeaderRight}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={css.sidebarSearch}>
        <div className={css.sidebarSearchContainer}>
          <SearchIcon style={{ color: "gray", padding: "10px" }} />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className={css.sidebarChats}>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
