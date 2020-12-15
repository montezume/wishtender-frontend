import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";
import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const buttonStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
const containerStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    textAlign: "center",
    [theme.breakpoints.down("450")]: {
      width: "100%",
    },
  },
}));

const dialogStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiDialog-container.MuiDialog-scrollBody": {
        display: "flex",
        overflow: "scroll",
      },
      "& .MuiDialog-paper": {
        maxHeight: "80%",
        margin: "auto",
        borderRadius: "6px",
        padding: theme.spacing(5, 1),
        paddingTop: 0,
      },
      [theme.breakpoints.down("450")]: {
        "& .MuiDialog-paper": {
          width: "100%",
          maxHeight: "none",
          height: "100%",
          margin: "auto",
          padding: "0px 0 0 0",
          boxSizing: "border-box",
          maxWidth: "none",
          borderRadius: "0",
        },
      },
    },
  };
});

/**
 * Renders a <StyledDialog /> component
 * @param  props
 * @param  props.open
 * @param  props.onClose
 * @param  props.ariaLabel
 **/
export default function StyledDialog(props) {
  const buttonClasses = buttonStyles();
  const dialogClasses = dialogStyles();
  const containerClasses = containerStyles();

  return (
    <>
      <Dialog
        scroll="body"
        open={props.open}
        onClose={props.onClose}
        aria-label={props.ariaLabel || "dialog"}
        className={dialogClasses.root}
      >
        <Container className={containerClasses.root}>
          <MuiDialogTitle>
            <IconButton
              aria-label="close"
              className={buttonClasses.closeButton}
              onClick={props.onClose}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          {props.children}
        </Container>
      </Dialog>
    </>
  );
}
