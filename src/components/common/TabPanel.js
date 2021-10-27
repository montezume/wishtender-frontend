import React from "react";
import { Box, Typography } from "@material-ui/core";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
