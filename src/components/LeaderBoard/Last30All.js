import React from "react";
import { Container, Paper, Grid } from "@mui/material";
import Last30 from "./Last30";
import useStyles from "./styles";

export default function Last30All() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Last30 limit={null} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
