// import React, { useEffect, useState } from "react";
// export default function Dashboard() {
//   const [users, setUsers] = useState();

//   useEffect(() => {
//     //   setUsers({ data: ["user1", "user2", "user3"] });
//     setTimeout(() => setUsers({ data: ["user1", "user2", "user3"] }), 100);
//   }, []);

//   useEffect(() => {
//     if (users && !users.updated) {
//       const usersCopy = users.data.map((p) => p + "pop");

//       usersCopy.updated = true;

//       setUsers(usersCopy);
//     }
//   }, [users]);

//   return (
//     <>
//       {" "}
//       Render text below:
//       {users && users.updated && <div>Text rendered!</div>}
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import MostActiveTable from "./MostActiveTable";
import { Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { mergeClasses } from "@mui/styles";
// import tstData from "./testUsers";
const tstData = [];
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
export default function Dashboard() {
  const testUsers = tstData;
  const [users, setUsers] = useState(null);
  const classes = useStyles();
  const [activity, setActivity] = useState({});
  // const [activity2, setActivity2] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
  //       credentials: "include",
  //     })
  //       .then(async (res) => {
  //         const json = await res.json();
  //         setUsers(json);
  //       })
  //       .catch((err) => {});
  //   })();
  // }, []);
  useEffect(() => {
    setTimeout(() => setUsers([2, 3]), 700);
  }, []);

  useEffect(() => {
    if (users && !activity.updated) {
      // const userCopy = [...users];

      const activitiesCopy = { ...activity };

      activitiesCopy.updated = true;

      setActivity(activitiesCopy);
    }
  }, [activity, users]);

  return (
    <>
      Render text below:
      {activity && activity.updated && <div>Text rendered!</div>}
    </>
  );
}
