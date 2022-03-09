import React from "react";
import Tooltip from "@mui/material/Tooltip";
import makeStyles from '@mui/styles/makeStyles';
import Help from "@mui/icons-material/Help";

const useStyles = makeStyles((theme) => {
  return {
    est: { color: theme.palette.error[300] },
  };
});

export default function ConvertedPrice({ formattedPrice }) {
  const classes = useStyles();
  return (
    <Tooltip
      title={`estimated conversion from ${formattedPrice.displayWithFee}`}
    >
      <div>
        <span className={classes.est}>est.</span>
        {formattedPrice.convertedWithFee}
        <Help color="error" style={{ fontSize: "15" }} />
      </div>
    </Tooltip>
  );
}
