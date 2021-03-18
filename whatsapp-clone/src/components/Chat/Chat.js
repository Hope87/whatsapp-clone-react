import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  Search,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import css from "./Chat.module.css";
import db from "../../firebase";
import { useStateValue } from "../Context/StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    setInput(value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("Messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("Messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className={css.chat}>
      <div className={css.chatHeader}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className={css.chatHeaderInfo}>
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className={css.chatHeaderRight}>
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className={css.chatBody}>
        {messages.map((message) => (
          <p
            className={`${css.chatMessage} ${
              message.name === user.displayName && css.chatReciever
            }`}
          >
            <span className={css.chatName}>{message.name}</span>
            {message.message}
            <span className={css.chatTimestemp}>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className={css.chatFooter}>
        <InsertEmoticon />

        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={handleChange}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>

        <Mic />
      </div>
    </div>
  );
}

export default Chat;
