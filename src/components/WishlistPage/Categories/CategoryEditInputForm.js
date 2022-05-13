import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import makeStyles from "@mui/styles/makeStyles";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserContext } from "../../../contexts/UserContext";

const useStyles = makeStyles({
  root: {
    padding: "0",
    "& .MuiInputBase-input": {
      padding: "5px 13px ",
    },
  },
});

/**
 * Renders a <UpdateMessageForm /> component
 * @param  props
 * @param  props.onClose
 * @param  props.handleUpdateWishlistMessage
 * @param  props.wishlistMessage
 */

export default function CategoryEditInputForm({
  setRequestStatus,
  category,
  onClose,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { user, getUser, setUser } = useContext(UserContext);

  const { ref: catRef, ...catReg } = register("updatedCategory");
  const classes = useStyles();
  const onSubmit = (data) => {
    if (data.updatedCategory)
      handleUpdateCategory(category, data.updatedCategory);
    onClose();
  };

  const handleUpdateCategory = async (category, updatedCategory) => {
    if (category === updatedCategory) return;
    setRequestStatus("processing");
    const headers = new Headers();
    headers.append("CSRF-Token", user.csrfToken);
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/wishlistItems/categories", {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify({
        category: category,
        update: updatedCategory,
      }),
    })
      .then(async (res) => {
        if (res.status >= 500 && res.status < 600) {
          setRequestStatus("loaded");
          const text = await res.text();
          return alert(text);
        }

        if (res.status >= 400 && res.status < 500) {
          setRequestStatus("loaded");
          const json = await res.json();
          if (json.errors) {
            alert(json.errors.map((msg) => msg.msg).join(" "));
          } else {
            alert(json.message);
          }
        }

        if (res.status >= 200 && res.status < 300) {
          const userUpdate = await getUser();
          setUser(userUpdate);
        }
      })
      .catch((err) => {
        alert("Please report error: " + err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form123" autoComplete="off">
      <TextField
        onKeyDown={(e) => e.stopPropagation()}
        name="message"
        className={classes.root}
        defaultValue={category}
        variant="outlined"
        style={{ width: "60%" }}
        spellCheck="false"
        {...catReg}
        inputRef={catRef}
      />

      <IconButton type="submit" size="small" aria-label="updated">
        <CheckIcon />
      </IconButton>
      <IconButton onClick={onClose} size="small" aria-label="cancel">
        <CancelIcon />
      </IconButton>
      {errors.category?.message && (
        <FormHelperText id="handle-helper-text">
          {errors.category?.message}
        </FormHelperText>
      )}
    </form>
  );
}
