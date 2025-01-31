import React, { useState } from "react";
import Button from "@mui/material/Button";
import StyledDialog from "../../../common/StyledDialog/StyledDialog";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";
import globalStyles from "../../../../themeStyles";
import withStyles from '@mui/styles/withStyles';

const styles = (theme) => ({
  margin: { margin: theme.spacing(0.5) },
});
/**
 * Renders a <UpdateProfileInfo /> component
 * @param  props
 * @param  props.handleCheckHandleAvailability
 * @param  props.handleUpdateHandle
 */
export default withStyles(styles)(function UpdateProfileInfo(props) {
  const classes = globalStyles(props);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        color="primary"
        aria-label="update profile info"
        variant="outlined"
        className={classes.margin}
      >
        Edit Profile
      </Button>

      {/* Dialog start */}
      <StyledDialog
        open={dialogOpen}
        ariaLabel="crop dialog"
        onClose={handleDialogClose}
      >
        <UpdateProfileForm
          handleCheckHandleAvailability={props.handleCheckHandleAvailability}
          handleUpdateHandle={props.handleUpdateHandle}
          handleUpdateWishlistName={props.handleUpdateWishlistName}
          handleUpdateAliasName={props.handleUpdateAliasName}
          onClose={handleDialogClose}
          wishlistName={props.wishlistName}
          aliasName={props.aliasName}
          handle={props.handle}
        ></UpdateProfileForm>
      </StyledDialog>
      {/* Dialog end */}
    </>
  );
});
