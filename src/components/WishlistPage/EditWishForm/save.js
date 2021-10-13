import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import StyledDialog from "../../common/StyledDialog/StyledDialog";

import {
  FormControl,
  Chip,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export default function CategoryEdit(props) {
  const [openNew, setOpenNew] = useState(null);
  const [wishlistCategories, setWishlistCategories] = useState(null);
  const [itemCategories, setItemCategories] = useState(null);
  // const [select, setSelect] = useState(null);
  // this isn't actually doing anything
  // const handleChange = (event) => {
  //   setCountry(event.target.value);
  // };
  useEffect(() => {
    setWishlistCategories(props.wishlistCategories);
    setItemCategories(props.itemCategories);
  }, [props.itemCategories, props.wishlistCategories]);

  const categoriesMenu = wishlistCategories?.map((cat) => {
    if (itemCategories.indexOf(cat) >= 0) return "";
    return <MenuItem value={cat}>{cat}</MenuItem>;
  });
  const handleDelete = (e) => {
    const category = e.currentTarget.parentElement.id.split("-")[2];

    const index = itemCategories.indexOf(category);
    const newCategories = [
      ...itemCategories.slice(0, index),
      ...itemCategories.slice(index + 1),
    ];
    setItemCategories(newCategories);
  };
  const handleChange = (event) => {
    if (itemCategories.indexOf(event.target.value) >= 0) return;
    setItemCategories([...itemCategories, event.target.value]);
  };
  return (
    <>
      <div style={{ gap: "1em", display: "flex" }}>
        Categories:
        {itemCategories?.length
          ? itemCategories.map((cat) => (
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
        <InputLabel id="demo-simple-select-label">Add Category</InputLabel>
        {/* <Controller
          control={props.control}
          name={props.name}
        {/* render={({ field, fieldState }) => ( */}
        <Select
          // defaultValue={props.itemCategories[0]} */}
          // {...field}
          // labelId={props.labelId}
          // id={props.id}
          // name="categories"
          // this isn't actually doing anything
          // value={select} /// <--- does this work?
          onChange={handleChange}
        >
          {categoriesMenu}
          <button
            value={"add"}
            onClick={() => {
              setOpenNew(true);
            }}
          >
            Add new category
          </button>
        </Select>
        {/* )} */}
        {/* /> */}
      </FormControl>
      <button>add</button>
      {openNew && (
        <StyledDialog
          onClose={() => {
            setOpenNew(false);
          }}
          open={openNew}
        >
          <p>Add New Category</p>
          <input id="new"></input>
          <button
            onClick={() => {
              const value = document.getElementById("new").value;
              setWishlistCategories([...wishlistCategories, value]);
              setOpenNew(false);
            }}
          >
            Save
          </button>
        </StyledDialog>
      )}
    </>
  );
}
