import React, { useEffect, useState } from "react";
import { fetchGet } from "../../scripts/fetchHelper";

export default function CheckOutSuccess() {
  const params = new URLSearchParams(window.location.search);
  const [session, setSession] = useState({});

  //   useEffect(() => {
  //     fetchGet(`/order/${params.get("session_id")}`, setSession);
  //   }, []);

  return <div> thanks!{params.get("session_id")}</div>;
}
