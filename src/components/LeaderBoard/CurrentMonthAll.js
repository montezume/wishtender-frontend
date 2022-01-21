import React from "react";
import CurrentMonth from "./CurrentMonth";
import { Container, Paper, Grid } from "@material-ui/core";
import useStyles from "./styles";

export default function CurrentMonthAll() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <CurrentMonth limit={null} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
