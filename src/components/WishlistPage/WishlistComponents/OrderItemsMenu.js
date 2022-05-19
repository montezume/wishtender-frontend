import React from "react";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

export default function OrderItemsMenu({
  setAnchorEl,
  setOrderedItems,
  anchorEl,
  items,
  openOrderMenu,
}) {
  const reorderItems = (ord) => {
    const itemsCopy = [...items];
    const sortingFunction = (ordr) => {
      const priceHigh = (it1, it2) => {
        return +it1.price.float < +it2.price.float ? 1 : -1;
      };
      const priceLow = (it1, it2) => {
        return +it1.price.float > +it2.price.float ? 1 : -1;
      };
      const time = (order) => {
        return (it1, it2) => {
          const getTime = (it) => {
            const timestamp = it._id.substring(0, 8);
            const date = new Date(parseInt(timestamp, 16) * 1000);
            return date;
          };
          const sort =
            order === "newest"
              ? getTime(it1) < getTime(it2)
              : getTime(it1) > getTime(it2);
          return sort ? 1 : -1;
        };
      };

      const defaultFunc = () => {};
      let sort;
      if (ordr === "priceHigh") sort = priceHigh;
      if (ordr === "priceLow") sort = priceLow;
      if (ordr === "timeNewest") sort = time("newest");
      if (ordr === "timeOldest") sort = time("oldest");
      if (ordr === "default") sort = defaultFunc;

      return sort;
    };

    setOrderedItems(itemsCopy.sort(sortingFunction(ord)));
  };
  return (
    <>
      <Tooltip title="Sort Items" placement="top">
        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          color="primary"
          size="large"
        >
          <TuneIcon style={{ fontSize: "1.3em" }}></TuneIcon>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openOrderMenu}
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
        <MenuItem
          onClick={() => {
            reorderItems("default");
            setAnchorEl(null);
          }}
        >
          Default
        </MenuItem>
        <MenuItem
          onClick={() => {
            reorderItems("priceHigh");
            setAnchorEl(null);
          }}
        >
          Price: High to Low
        </MenuItem>
        <MenuItem
          onClick={() => {
            reorderItems("priceLow");
            setAnchorEl(null);
          }}
        >
          Price: Low to High
        </MenuItem>
        <MenuItem
          onClick={() => {
            reorderItems("timeNewest");
            setAnchorEl(null);
          }}
        >
          Most Recent
        </MenuItem>
        <MenuItem
          onClick={() => {
            reorderItems("timeOldest");
            setAnchorEl(null);
          }}
        >
          Oldest
        </MenuItem>
      </Menu>
    </>
  );
}
