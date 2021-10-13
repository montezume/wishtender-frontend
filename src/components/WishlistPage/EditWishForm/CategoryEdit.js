import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import StyledDialog from "../../common/StyledDialog/StyledDialog";

import {
  FormControl,
  Chip,
  InputLabel,
  MenuItem,
  Button,
  Menu,
} from "@material-ui/core";

export default function CategoryEdit(props) {
  const [openNew, setOpenNew] = useState(null);
  const [anchorElCategories, setAnchorElCategories] = useState(null);

  const openCatOptions = Boolean(anchorElCategories);
  const [wishlistCategories, setWishlistCategories] = useState(null);
  const [itemCategories, setItemCategories] = useState(null);
  const [select, setSelect] = useState(null);
  // this isn't actually doing anything
  // const handleChange = (event) => {
  //   setCountry(event.target.value);
  // };
  useEffect(() => {
    setWishlistCategories(props.wishlistCategories);
    // setItemCategories(props.itemCategories);
  }, [props.itemCategories, props.wishlistCategories]);

  useEffect(() => {
    if (!openNew && !document.getElementById("new")) return;
    const disableEnterForm = function (event) {
      var keycode = event.key;
      if (keycode === "Enter") {
        event.stopPropagation();
        const value = document.getElementById("new")?.value;
        if (props.itemCategories.indexOf(value) < 0) {
          props.setItemCategories([...props.itemCategories, value]);
        }
        setOpenNew(false);
        setAnchorElCategories(null);
      }
    };
    if (openNew) {
      document.addEventListener("keypress", disableEnterForm);
    } else {
      document.removeEventListener("keypress", disableEnterForm);
    }
  }, [openNew, props]);
  const handleChange = (event) => {
    if (itemCategories?.indexOf(event.target.attributes.value.value) >= 0)
      return;
    // setItemCategories([...itemCategories, event.target.attributes.value.value]);
    props.setItemCategories([
      ...props.itemCategories,
      event.target.attributes.value.value,
    ]);
    setAnchorElCategories(null);
  };
  const handleClose = () => {
    setAnchorElCategories(null);
  };
  const categoriesMenu = wishlistCategories?.map((cat) => {
    if (props.itemCategories.indexOf(cat) >= 0) return <div></div>;
    return (
      <MenuItem onClick={handleChange} value={cat}>
        {cat}
      </MenuItem>
    );
  });
  // const categoriesMenu = wishlistCategories?.map((cat) => (
  //   <MenuItem onClick={handleChange} value={cat}>
  //     {cat}
  //   </MenuItem>
  // ));
  const handleDelete = (e) => {
    const category = e.currentTarget.parentElement.id.split("-")[2];

    const index = props.itemCategories.indexOf(category);
    const newCategories = [
      ...props.itemCategories.slice(0, index),
      ...props.itemCategories.slice(index + 1),
    ];
    props.setItemCategories(newCategories);
  };

  return (
    <>
      <div style={{ gap: "1em", display: "flex", flexWrap: "wrap" }}>
        Categories:
        {props.itemCategories?.length
          ? props.itemCategories.map((cat) => (
              <Chip
                id={`chip-category-${cat}`}
                label={cat}
                onDelete={handleDelete}
              />
            ))
          : ""}
      </div>
      <FormControl
        style={{
          minWidth: 220,
          width: 220,
        }}
      >
        <Button
          focusRipple={false}
          onClick={(e) => {
            setAnchorElCategories(e.currentTarget);
          }}
        >
          Add category
        </Button>
        <Menu
          anchorEl={anchorElCategories}
          open={openCatOptions}
          onClose={() => {
            setAnchorElCategories(null);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {categoriesMenu}
          <MenuItem
            onClick={() => {
              setOpenNew(true);
            }}
          >
            Add new category
          </MenuItem>
        </Menu>
      </FormControl>
      {openNew && (
        <StyledDialog
          onClose={() => {
            setOpenNew(false);
          }}
          open={openNew}
        >
          <p>Add New Category</p>
          <input autocomplete="off" id="new"></input>
          <button
            onClick={() => {
              const value = document.getElementById("new").value;
              if (props.itemCategories.indexOf(value) < 0) {
                props.setItemCategories([...props.itemCategories, value]);
              }

              setOpenNew(false);
              setAnchorElCategories(null);
            }}
          >
            Save
          </button>
        </StyledDialog>
      )}
    </>
  );
}
