import React from "react";
import Twenty21CalenderYear from "./Twenty21CalenderYear";
import { Container, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
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
export default function Twenty21All() {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Twenty21CalenderYear limit={null} link={null} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
