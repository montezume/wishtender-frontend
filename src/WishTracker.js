import React, { useEffect, useContext } from "react";
import { fetchGet } from "./scripts/fetchHelper";
import { UserContext } from "./contexts/UserContext";

export default function WishTracker() {
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (currentUser)
      fetchGet(`/api/orders/${currentUser.aliases[0]}`, console.log);
  }, []);
  return <div>wish tracker</div>;
}
