import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

const flexCenter = {
  display: "flex",
  alignItems: "center",
};
const useStyles = makeStyles((theme) => ({
  userDisplay: {
    ...flexCenter,
    gap: "1em",
  },
  rankDisplay: { ...flexCenter, gap: "0.5em" },
}));

const numSkeleton = 10;

export default function UserTableInsideSkeleton({ showPercent, ...props }) {
  const classes = useStyles();

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
        {[...Array(numSkeleton)].map((_element, i) => (
          <TableRow key={`${i}-leader-skeleton`}>
            <TableCell>
              <div className={classes.rankDisplay}>
                #
                <Skeleton variant="text" width={20} />
              </div>
            </TableCell>
            <TableCell>
              <div className={classes.userDisplay}>
                <Skeleton variant="circular" height={40} width={40} />
                <Skeleton variant="text" height={20} width={100} />
              </div>
            </TableCell>
            {showPercent && (
              <TableCell>
                <Skeleton variant="text" width={20} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
