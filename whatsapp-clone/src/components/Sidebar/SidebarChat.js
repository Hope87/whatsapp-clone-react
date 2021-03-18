import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import css from "./SidebarChat.module.css";
import db from "../../firebase";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("Messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className={css.sidebarChat}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className={css.sidebarChatInfo}>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className={css.sidebarChat} onClick={createChat}>
      <h3 className={css.newChatTitle}>Add new chat</h3>
    </div>
  );
}

export default SidebarChat;
