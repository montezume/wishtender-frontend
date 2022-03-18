import {
  Container,
  Paper,
  Button,
  Link,
  LinearProgress,
  Box,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import React, { useState, useContext, useEffect } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { fetchDelete } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
import SendResetPassword from "../ResetPassword/SendResetPassword.js";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import { withRouter } from "react-router";
import UpdateEmail from "./UpdateEmail";
import DeleteAccount from "./DeleteAccount";
import Switch from "@mui/material/Switch";
const paymentLink = `${process.env.REACT_APP_BASE_URL}/api/stripe/login?from=account-settings`;

const EnableLeaderboard = ({ setLoading }) => {
  const { user, getUser, setUser } = useContext(UserContext);

  return (
    <>
      <Switch
        checked={!!user.publicizeStats}
        onChange={() => {
          setLoading(true);
          const headers = new Headers();
          headers.append("CSRF-Token", user.csrfToken);
          headers.append("Content-Type", "application/json");
          fetch(`${process.env.REACT_APP_BASE_URL}/api/users/`, {
            method: "PATCH",
            credentials: "include",
            headers,
            body: JSON.stringify({ publicizeStats: !user.publicizeStats }),
          }).then(async (res) => {
            if (res.status >= 400 && res.status < 500) {
              const json = await res.json();
              if (json.errors) {
                alert(json.errors.map((msg) => msg.msg).join(" "));
              } else {
                alert(json.message);
              }
            }
            if (res.status >= 500 && res.status < 600) {
              const text = await res.text();
              alert(text);
            }
            const userUpdate = await getUser();
            setUser(userUpdate);
            setLoading(false);
          });
        }}
      />
    </>
  );
};
const StyledMenuItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      borderBottom: "none",
    },
  },
}))(MenuItem);

export default withRouter(function AccountSettings(props) {
  const [dialog, setDialog] = useState(null);
  const [loading, setLoading] = useState();
  const { user, getUser, setUser } = useContext(UserContext);

  const paymentMenuItem = user.stripeAccountInfo?.activated ? (
    <StyledMenuItem
      href={paymentLink}
      style={{ borderBottom: "1px solid #e6e6e6", color: "#02bff2" }}
      component={Link}
      color="primary"
    >
      <ListItemText primary="Payment Dashboard" />
      <ArrowRightIcon />
    </StyledMenuItem>
  ) : (
    <StyledMenuItem
      onClick={() =>
        alert("You need to activate payments from the wishlist page first.")
      }
      style={{ borderBottom: "1px solid #e6e6e6", color: "#02bff2" }}
      component={Link}
      color="primary"
    >
      <ListItemText primary="Payment Dashboard" />
      <ArrowRightIcon />
    </StyledMenuItem>
  );

  return (
    //collapsing margins, need display flex
    <Container
      style={{
        maxWidth: "750px",
        display: "flex",
        position: "relative",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <Paper
        style={{
          marginTop: "7vw",
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              width: "100%",
              position: "absolute",
            }}
          >
            {<LinearProgress />}
          </div>
        )}
        {paymentMenuItem}
        <StyledMenuItem
          color="primary"
          onClick={() => {
            setDialog("email");
          }}
        >
          <ListItemText primary="Email" />
          {user.email}

          <ArrowRightIcon />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setDialog("password");
          }}
          color="primary"
        >
          <ListItemText primary="Password" />
          <ArrowRightIcon />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setDialog("delete");
          }}
          color="primary"
        >
          <ListItemText primary="Delete Account" />
          <ArrowRightIcon />
        </StyledMenuItem>

        <Box //
          display="flex"
          flexDirection="row"
          style={{
            padding: ".5em 1em",
            borderTop: "1px solid #e6e6e6",
          }}
          // get rid of click hover
          color="primary"
        >
          <ListItemText
            primary={
              <>
                Display my account on the public{" "}
                <Link href="leaderboard"> leaderboard</Link>
              </>
            }
          />
          <EnableLeaderboard setLoading={setLoading} />
        </Box>
      </Paper>
      <StyledDialog onClose={() => setDialog(null)} open={dialog === "email"}>
        <UpdateEmail
          onClose={async () => {
            setDialog(null);
            setUser(await getUser());
          }}
        />
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "password"}
      >
        <SendResetPassword />
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "payment-dashboard"}
      >
        payment
      </StyledDialog>
      <StyledDialog onClose={() => setDialog(null)} open={dialog === "delete"}>
        <DeleteAccount
          user={user}
          onClose={async () => {
            props.history.push("/");
            setUser(await getUser());
          }}
        />
      </StyledDialog>
      <StyledDialog
        onClose={() => setDialog(null)}
        open={dialog === "change email"}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await fetchDelete(
              `${process.env.REACT_APP_BASE_URL}/api/users/${user._id}`,
              async (res) => {
                if (res.status === 200) {
                  alert("deleted");
                }
              }
            );
          }}
        >
          Are you sure you want to delete your account?
          <Button onClick={() => setDialog(null)}>Cancel</Button>{" "}
          <Button type="submit">Delete</Button>
        </form>
      </StyledDialog>
    </Container>
  );
});
