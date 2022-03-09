import React from "react";
import Twenty21CalenderYear from "./Twenty21CalenderYear";
import { Container, Paper, Grid } from "@mui/material";
import useStyles from "./styles";

export default function Twenty21All() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Twenty21CalenderYear limit={null} link={null} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
