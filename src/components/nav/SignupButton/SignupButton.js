import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SignupButton() {
  return (
    <Link to="/sign-up">
      <Button variant="contained" disableElevation color="primary">
        Signup
      </Button>
    </Link>
  );
}
