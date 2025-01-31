import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Last30 from "./Last30";
import CurrentMonth from "./CurrentMonth";
import { Container, Paper, Grid, Link, Button } from "@mui/material";
import Twenty21CalenderYear from "./Twenty21CalenderYear";
import Alert from "@mui/material/Alert";

import useStyles from "./styles";

export default function LeaderBoard() {
  const { user } = useContext(UserContext);
  const [show2021, setShow2021] = useState(false);
  const [show30, setShow30] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.background}>
      {user && user.publicizeStats === undefined && (
        <Alert severity="info">
          To display your username on the leaderboard, edit your{" "}
          <Link href="/account-settings">settings</Link>.
        </Alert>
      )}
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <CurrentMonth limit={10} link="/leaderboard/current-month" />
            </Paper>
          </Grid>

          {show30 ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Last30 limit={10} link="/leaderboard/last-30-days" />
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setShow30(true);
                }}
                disableElevation
                variant="contained"
                color="secondary"
              >
                Show 30 Day Leaderboard
              </Button>
            </Grid>
          )}
          {show2021 ? (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Twenty21CalenderYear link="/leaderboard/2021" limit={10} />
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setShow2021(true);
                }}
                disableElevation
                variant="contained"
                color="secondary"
              >
                Show 2021 Leaderboard
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}
