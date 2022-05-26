import React from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, DialogTitle } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import makeStyles from "@mui/styles/makeStyles";
import PriceInputs from "../../../../WishlistPage/PriceInput";
const useStyles = makeStyles((theme) => ({
  title_xs: {
    position: "relative",
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    padding: "0",
    left: 0,
    display: "flex",
    width: "100%",
    height: "2.8em",
    alignItems: "center",
    justifyContent: "space-between",
  },

  closeButton_xs: { color: "white" },

  titleText_xs: { position: "relative" },
}));
export default function DialogTitleSectionXs(props) {
  const classes = useStyles();

  return (
    <DialogTitle
      className={classes.title_xs}
      style={!props.onClose ? { justifyContent: "center" } : {}}
    >
      {props.onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton_xs}
          onClick={props.onClose}
          size="large"
        >
          <ArrowBackIcon color="primary" />
        </IconButton>
      )}

      <Typography variant="h6" className={classes.titleText_xs} color="primary">
        {props.children}
      </Typography>
      {props.onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton_xs}
          onClick={props.onClose}
          size="large"
        >
          <CloseIcon color="primary" />
        </IconButton>
      )}
    </DialogTitle>
  );
}
