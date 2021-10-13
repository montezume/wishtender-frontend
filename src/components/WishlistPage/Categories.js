import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
} from "@material-ui/core";

export default function Categories(props) {
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
        <MenuItem>
          <FormControlLabel
            onClick={() => {
              if (!props.showCategories.includes("All"))
                props.setShowCategories([...props.categories, "All"]);
            }}
            control={
              <Checkbox
                checked={
                  props.showCategories.includes("All")
                  // !props.categories.filter(
                  //   (ct) => props.showCategories.indexOf(ct) < 0
                  // ).length
                }
              />
            }
            label={"All"}
          />
        </MenuItem>

        {props.categories.map((cat) => (
          <MenuItem>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.setShowCategories([...props.showCategories, cat]);
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
                  checked={!(props.showCategories.indexOf(cat) < 0)}
                />
              }
              label={cat}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
