import React from "react";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Button } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));



export default function GetProductInfoButton(props) {
  const classes = useStyles();
console.log(props.submit);
  return (
    <div>

        <form className={classes.root} onSubmit = {props.submit} noValidate>
            <TextField
            className={classes.margin}
            label="Enter Item URL"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            />
            <IconButton onClick = {props.submit} color="primary" aria-label="directions">
                <DirectionsIcon />
            </IconButton>
        </form>
        
    </div>
  );
}