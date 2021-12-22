import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function LiveStorePurchases() {
  let { storeId } = useParams();
  const URL = "ws://127.0.0.1:4000?storeId=" + storeId;

  const socket = useRef(null);
  const [message, setMessage] = useState("");
  const [reconnectInterval, setReconnectInterval] = useState(null);
  const [intervalHandle, setIntervalHandle] = useState(null);

  useEffect(() => {
    connect();

    return () => {
      socket.current.close();
    };
  }, []);

  useEffect(() => {
    setReconnectInterval(2000);
    return () => window.clearInterval(intervalHandle);
  }, []);

  useEffect(() => {
    if (reconnectInterval === null) {
      window.clearInterval(intervalHandle);
    } else {
      setIntervalHandle(
        window.setInterval(() => {
          connect();
          console.log("reconnecting...");
        }, reconnectInterval)
      );
    }
  }, [reconnectInterval]);

  function connect() {
    socket.current = new WebSocket(URL);
    socket.current.onopen = onOpen;
    socket.current.onclose = onClose;
    socket.current.onmessage = onMessage;

    setReconnectInterval(null);
  }

  function onOpen(e) {
    console.log("socket ready state", socket.current.readyState);
    if (socket.current.readyState === 0) return;
    socket.current.send(
      JSON.stringify({
        type: "connect",
        user: Date.now(),
      })
    );
  }

  function onClose(e) {
    setReconnectInterval(2000);
  }

  function onMessage(e) {
    setMessage(e.data);
  }

  return (
    <div
      style={{
        color: "red",
        fontSize: "4rem",
      }}
    >
      {message}
      store: {storeId}
    </div>
  );
}
