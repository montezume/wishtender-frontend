import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { displayPriceFromUnit } from "../../scripts/helpers";

export default function EarningsCard({ total, referred, title }) {
  return (
    <Card style={{ padding: "1rem" }} variant="outlined">
      <Typography color="textSecondary">{title}</Typography>
      <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
        {total !== undefined &&
          total !== null &&
          displayPriceFromUnit(total, "USD", "en-us")}
      </Typography>
      {total < 0 && (
        <Typography
          gutterBottom
          style={{ marginBottom: "1rem" }}
          component="p"
          variant="body"
          color="textSecondary"
        >
          Negative earnings mean your referred users cost WishTender more than
          the profit they brought in. You don't owe anything, WishTender covers
          these costs. These costs are higher when users get their first
          purchase of the month, and usually even out over the month.
        </Typography>
      )}
      {referred !== undefined && referred !== null && (
        <Typography>{referred} users referred</Typography>
      )}
    </Card>
  );
}
