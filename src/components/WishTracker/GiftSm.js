import React, { useContext } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import makeStyles from '@mui/styles/makeStyles';
import { Box, Tooltip } from "@mui/material";
import RemoveWish from "./RemoveWish";

const useStyles = makeStyles((theme) => {
  return {
    itemName: {
      fontSize: ".5rem",
      marginLeft: theme.spacing(1),
      minWidth: "80px",
      width: "100%",
    },
    cell1: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(0),
      "& .MuiBox-root": { maxWidth: "250px" },
    },
    cell2: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(1) },
    giftButton: {
      display: "block",
      paddingLeft: theme.spacing(0),
    },
  };
});

const Gift = ({ orderId, gift, setRefreshWishlist, tweetIntent }) => {
  const classes = useStyles();
  return (
    <TableRow key={orderId + "-" + gift.item._id}>
      <TableCell style={{ minWidth: "40px" }} className={classes.cell1}>
        <Box display="flex" justifyContent="space-between">
          <img
            width="60"
            height="60"
            src={gift.item.itemImage}
            alt={gift.item.itemName}
          />
          <p className={classes.itemName}>
            {gift.item.url ? (
              <a href={gift.item.url}> {gift.item.itemName}</a>
            ) : (
              gift.item.itemName
            )}
          </p>
          {gift.item.url && (
            <p>
              <a href={gift.item.url}>
                <OpenInNewIcon color="primary" />
              </a>
            </p>
          )}
        </Box>
      </TableCell>
      <TableCell className={classes.cell2}>
        QTY: {gift.qty}
        <br></br>
        {gift.price.display}
        <RemoveWish wish={gift.item._id}>
          <Button
            size="small"
            color="primary"
            className={classes.giftButton}
            disableElevation
          >
            Remove
          </Button>
        </RemoveWish>
      </TableCell>
    </TableRow>
  );
};

export default Gift;
