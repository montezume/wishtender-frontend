import React from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, DialogTitle } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  title_xs: {
    position: "relative",
    padding: "0",
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
    width: "100%",
    height: "4em",
    "& h2.MuiTypography-root": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },

  closeButton_xs: { color: "white" },

  titleText_xs: { position: "relative" },
}));
export default function DialogTitleSectionXs(props) {
  const classes = useStyles();

  return (
    <DialogTitle className={classes.title_xs}>
      <IconButton
        aria-label="close"
        className={classes.closeButton_xs}
        onClick={props.onClose}
        size="large">
        <ArrowBackIcon color="contrast" />
      </IconButton>

      <Typography
        variant="h6"
        className={classes.titleText_xs}
        color="contrast"
      >
        {props.children}
      </Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton_xs}
        onClick={props.onClose}
        size="large">
        <CloseIcon color="contrast" />
      </IconButton>
    </DialogTitle>
  );
}
