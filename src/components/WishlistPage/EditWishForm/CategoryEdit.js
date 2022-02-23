import React, { useCallback, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

import {
  FormControl,
  Chip,
  InputLabel,
  MenuItem,
  Button,
  Menu,
} from "@material-ui/core";
import CreateNewCategory from "./CreateNewCategory";

export default function CategoryEdit(props) {
  const [openNew, setOpenNew] = useState(null);
  const [eventAdded, setEventAdded] = useState(null);
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
    const category = e.currentTarget.parentElement.id.slice(14); // id ex: 'chip-category-fave clothes'

    const index = props.itemCategories.indexOf(category);
    const newCategories = [
      ...props.itemCategories.slice(0, index),
      ...props.itemCategories.slice(index + 1),
    ];
    props.setItemCategories(newCategories);
  };

  return (
    <>
      <div
        style={{
          padding: "1em 1em .8em 1em",
          border: "1px solid lightgrey",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            gap: "1em",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
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
            margin: "1em 0 0 0",
          }}
        >
          <Button
            // variant="outlined"
            color="primary"
            // focusRipple={false}
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
          <CreateNewCategory
            setOpenNew={setOpenNew}
            itemCategories={props.itemCategories}
            setItemCategories={props.setItemCategories}
            setAnchorElCategories={setAnchorElCategories}
          />
        )}
      </div>
    </>
  );
}
