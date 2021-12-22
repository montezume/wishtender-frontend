import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket("ws://127.0.0.1:4000/");

export default function OBSPlugin() {
  let { alias: aliasPath } = useParams();
  useEffect(() => {
    client.onopen = () => {
      alert("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      alert("WebSocket Client on message" + message.data);
    };
  }, []);
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
