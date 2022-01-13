import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../common/TableTitle";
import { Link } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function UserTable(props) {
  const { users } = props;
  const { limit } = props;

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Handle</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.slice(0, limit ? limit : users.length).map((user, i) => (
          <TableRow key={user.alias?.id || Math.floor(Math.random() * 100000)}>
            <TableCell>{"#" + (i + 1)}</TableCell>
            <TableCell>
              {!user.alias?.handle ? (
                "Anonymous"
              ) : (
                <Link
                  href={user.alias?.handle}
                >{`@${user.alias?.handle}`}</Link>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
