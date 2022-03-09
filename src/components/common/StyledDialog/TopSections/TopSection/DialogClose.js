import React from "react";
import { DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  closeButtonV1: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
}));
export default function DialogClose(props) {
  const classes = useStyles(props);
  return (
    // <DialogTitle style={props.style}>
    // {/* </DialogTitle> */}
    <IconButton
      aria-label="close"
      className={classes.closeButtonV1}
      onClick={props.onClose}
      size="large">
      <CloseIcon />
    </IconButton>
  );
}
