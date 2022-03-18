import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../common/TableTitle";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function MostActiveTable(props) {
  const { userActivity } = props;

  const { title } = props;
  const classes = useStyles();
  return (
    <>
      {title}
      <Title>{title || "Users"}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last</TableCell>
            <TableCell># this week</TableCell>
            <TableCell>Orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userActivity.map((user) => (
            <TableRow key={user.user.id}>
              <TableCell>{user.user.aliases[0].handle}</TableCell>
              <TableCell>
                {user.lastActivity.toString
                  ? user.lastActivity.toString()
                  : user.lastActivity}
              </TableCell>
              <TableCell>{user.last7.length}</TableCell>
              <TableCell>{user.user.orders?.length}</TableCell>
              <TableCell align="right">{user.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={() => {}}>
          See more orders
        </Link>
      </div>
    </>
  );
}
