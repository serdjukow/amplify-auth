import React from "react";
import { Drawer } from "@mui/material";
import useStyles from "./styles";

type SidebarDrawerProps = {
  children: React.ReactNode;
};

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ children }) => {
  const { classes } = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      {children}
    </Drawer>
  );
};

export default SidebarDrawer;
