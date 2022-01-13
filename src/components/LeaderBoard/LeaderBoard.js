import React, { useEffect, useState } from "react";
import Last30 from "./Last30";
import CurrentMonth from "./CurrentMonth";
import { Container, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Twenty21CalenderYear from "./Twenty21CalenderYear";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
export default function LeaderBoard() {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <CurrentMonth limit={10} link="/leaderboard/current-month" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Last30 limit={10} link="/leaderboard/last-30-days" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Twenty21CalenderYear link="/leaderboard/2021" limit={10} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
