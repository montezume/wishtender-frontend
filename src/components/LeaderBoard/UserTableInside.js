import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

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
