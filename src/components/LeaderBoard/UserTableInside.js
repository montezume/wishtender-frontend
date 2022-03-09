import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) => ({
  userDisplay: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
  },
}));
export default function UserTable(props) {
  const classes = useStyles();
  const { users } = props;
  const { limit } = props;
  const { showPercent } = props;

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Handle</TableCell>
          {showPercent && <TableCell>Top</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.slice(0, limit ? limit : users.length).map((user, i) => (
          <TableRow key={user.alias?.id || Math.floor(Math.random() * 100000)}>
            <TableCell>{"#" + (i + 1)}</TableCell>
            <TableCell>
              {!user.alias?.handle ? (
                <div className={classes.userDisplay}>
                  <Avatar alt={"anonymous"} />
                  Anonymous
                </div>
              ) : (
                <>
                  <Link
                    className={classes.userDisplay}
                    href={"../" + user.alias?.handle}
                  >
                    <Avatar
                      alt={user.alias?.handle}
                      src={user.alias?.profileImage}
                    />
                    {`@${user.alias?.handle}`}
                  </Link>
                </>
              )}
            </TableCell>
            {showPercent && <TableCell>{user.topPercent}%</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
