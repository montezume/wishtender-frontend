import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL = "ws://127.0.0.1:4000";

export default function OBSPlugin() {
  let { alias: aliasPath } = useParams();

  const [user, setUser] = useState("Tarzan");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  const submitMessage = (usr, msg) => {
    const message = { user: usr, message: msg };
    ws.send(JSON.stringify(message));
    setMessages([message, ...messages]);
  };

  useEffect(() => {
    ws.onopen = () => {
      newFunction();

      function newFunction() {
        alert("WebSocket Connected");
      }
    };

    ws.onmessage = (e) => {
      const message = e.data;
      alert(message);
      setMessages([message, ...messages]);
    };

    return () => {
      ws.onclose = () => {
        alert("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws.onmessage, ws.onopen, ws.onclose, messages, ws]);

  return (
    <div
      style={{
        color: "red",
        fontSize: "4rem",
        top: "0px",
        position: "fixed",
        height: "100vh",
        width: "100%",
        border: "10px solid red",
      }}
    >
      wishtender.com/{aliasPath}
    </div>
  );
}
