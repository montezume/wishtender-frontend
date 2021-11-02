import React from "react";
import { Container } from "@material-ui/core";

import AllCarts from "./AllCarts";

export default function Cart(props) {
  return (
    <div>
      <Container
        maxWidth="md"
        style={{
          marginTop: "6vw",
          paddingBottom: "7vw",
          paddingRight: "7vw",
          paddingLeft: "7vw",
        }}
      >
        <AllCarts />
      </Container>
    </div>
  );
}
