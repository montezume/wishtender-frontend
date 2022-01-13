import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "@material-ui/core";
export default function UserTable(props) {
  const { users } = props;
  const { limit } = props;

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Handle</TableCell>
          {/* <TableCell>Top Percent</TableCell> */}
          <TableCell>Email</TableCell>
          <TableCell>Orders</TableCell>
          <TableCell>Net Profit</TableCell>
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
            {/* <TableCell>{(((i + 1) / total users) * 100).toFixed(2) + "%"}</TableCell> */}
            <TableCell>{user.alias.user.email}</TableCell>
            <TableCell>{user.orders.length}</TableCell>
            <TableCell>{user.netProfitWithConnectFee}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
