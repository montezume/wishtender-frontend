import React from "react";
import { Box, Typography } from "@mui/material";

export default function TabPanel(props) {
  const { children, selectedTab, tab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== tab}
      id={`simple-tabpanel-${tab}`}
      aria-labelledby={`simple-tab-${tab}`}
      {...other}
    >
      {selectedTab === tab && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
