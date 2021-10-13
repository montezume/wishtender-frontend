import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";

export default function Categories({ categories }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openCategoriesMenu = Boolean(anchorEl);

  return (
    <div>
      <Button
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
        {categories.forEach((cat) => (
          <MenuItem
            onClick={() => {
              // showCategoryItems(cat);
              setAnchorEl(null);
            }}
          >
            {cat}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
