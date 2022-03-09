import React, { cloneElement } from "react";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Typography } from "@mui/material";

const containerStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("450")]: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
    },
  },
}));

/**
 * Renders a <StyledDialog /> component
 * @param  props
 * @param  props.open
 * @param  props.onClose
 * @param  props.ariaLabel
 **/
export default function StyledDialog(props) {
  const dialogStyles = makeStyles((theme) => {
    return {
      root: {
        "& .MuiDialog-container.MuiDialog-scrollBody": {
          display: "flex",
          overflow: "scroll",
        },
        "& .MuiDialog-paper": {
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          background: props.background,
          maxHeight: "80%",
          margin: "auto",
          borderRadius: "6px",
          // paddingTop: 0,
        },
        [theme.breakpoints.down(props.mobileBreakPoint || "450")]: {
          "& .MuiDialog-paper": {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            background: props.background_xs,
            width: "100%",
            maxHeight: "none",
            height: "100%",
            margin: "auto",
            boxSizing: "border-box",
            maxWidth: "none",
            borderRadius: "0",
            // "& .MuiContainer-root": { padding: 0 },
            // "& .MuiBox-root": { border: "3px solid pink" },
          },
        },
      },
    };
  });

  // const childClasses = childStyles();
  const dialogClasses = dialogStyles();
  const containerClasses = containerStyles();
  // const clonedChildren = cloneElement(
  //   props.children,
  //   {
  //     onClose: props.onClose,
  //     classes: childClasses,
  //   },
  //   null
  // );

  return (
    <>
      <Dialog
        scroll="body"
        open={props.open}
        onClose={props.onClose} // when you click on the side
        aria-label={props.ariaLabel || "dialog"}
        className={dialogClasses.root}
      >
        <Box className={containerClasses.root}>{props.children}</Box>
      </Dialog>
    </>
  );
}
