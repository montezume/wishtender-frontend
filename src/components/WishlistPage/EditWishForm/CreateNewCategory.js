import React, { useEffect, useState, useCallback } from "react";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import { Button, Input, TextField } from "@material-ui/core";
export default function CreateNewCategory(props) {
  const memoDisableEnterForm = useCallback((event) => {
    let keycode = event.key;
    if (keycode === "Enter") {
      event.stopPropagation();
      const value = document.getElementById("new")?.value;
      if (props.itemCategories.indexOf(value) < 0) {
        props.setItemCategories([...props.itemCategories, value]);
      }
      props.setOpenNew(false);
      props.setAnchorElCategories(null);
    }
  });

  useEffect(() => {
    window.addEventListener("keypress", memoDisableEnterForm);

    return function cleanupListener() {
      window.removeEventListener("keypress", memoDisableEnterForm);
    };
  }, []);
  return (
    <StyledDialog
      onClose={() => {
        props.setOpenNew(false);
      }}
      open={true}
      style={{ padding: "1em" }}
    >
      {" "}
      <div
        style={{
          padding: "auto",
          width: "80%",
          margin: "1em auto",
          minWidth: "220px",
        }}
      >
        <p>Add New Category</p>
        <Input variant="outlined" autoComplete="off" id="new"></Input>
        <Button
          onClick={() => {
            const value = document.getElementById("new").value;
            if (props.itemCategories.indexOf(value) < 0) {
              props.setItemCategories([...props.itemCategories, value]);
            }

            props.setOpenNew(false);
            props.setAnchorElCategories(null);
          }}
        >
          Save
        </Button>
      </div>
    </StyledDialog>
  );
}
