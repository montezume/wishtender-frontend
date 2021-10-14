import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
  // IconButton,
} from "@material-ui/core";
// import StyledDialog from "../common/StyledDialog/StyledDialog";

// import DeleteForever from "@material-ui/icons/DeleteForever";

export default function Categories(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [editOn, setEditOn] = useState(null);
  // const [openDelete, setOpenDelete] = useState(null);
  const openCategoriesMenu = Boolean(anchorEl);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        color="primary"
        size="large"
      >
        Categories
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={openCategoriesMenu}
        onClose={(e) => {
          setAnchorEl(null);
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
        <MenuItem>
          <FormControlLabel
            onClick={() => {
              if (!props.showCategories.includes("All"))
                props.setShowCategories([...props.categories, "All"]);
            }}
            control={
              <Checkbox checked={props.showCategories.includes("All")} />
            }
            label={"All"}
          />
        </MenuItem>

        {props.categories.sort().map((cat) => (
          <MenuItem>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    if (props.showCategories.includes("All")) {
                      props.setShowCategories([cat]);
                    } else if (
                      e.target.checked ||
                      props.showCategories.includes("All")
                    ) {
                      props.setShowCategories([...props.showCategories, cat]);
                    } else if (
                      !e.target.checked ||
                      !props.showCategories.length
                    ) {
                      props.setShowCategories([...props.showCategories, "All"]);
                    } else {
                      const index = props.showCategories.indexOf(cat);
                      let newCategories = [
                        ...props.showCategories.slice(0, index),
                        ...props.showCategories.slice(index + 1),
                      ];
                      const indexOfAll = newCategories.indexOf("All");
                      newCategories = [
                        ...newCategories.slice(0, indexOfAll),
                        ...newCategories.slice(indexOfAll + 1),
                      ];
                      props.setShowCategories(newCategories);
                    }
                  }}
                  checked={
                    props.showCategories.includes(cat) &&
                    !props.showCategories.includes("All")
                  }
                />
              }
              label={cat}
            />
            {/* {editOn && (
              <IconButton
                onClick={(e) => {
                  console.log(e);
                  setOpenDelete(e.currentTarget.id.slice(24));
                }}
                id={"delete-category-forever-" + cat}
              >
                <DeleteForever />
              </IconButton>
            )} */}
          </MenuItem>
        ))}
        {/* {props.categories.length && props.isAuth && (
          <MenuItem onClick={() => setEditOn(!editOn)}>
            Edit Categories
          </MenuItem>
        )} */}
      </Menu>

      {/* <StyledDialog
        onClose={() => {
          setOpenDelete(null);
          setEditOn(null);
        }}
        open={openDelete}
      >
        {" "}
        <p>
          Are you sure you want to delete the category "{openDelete}"? All items
          will remain on your wishlist but "{openDelete}" will yummy will be
          removed as a category.
        </p>
        <button onClick={() => {}}>Yes, Delete</button>
        <Button onClick={() => {}}>Cancel</Button>
      </StyledDialog> */}
    </div>
  );
}
