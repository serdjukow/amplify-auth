import React from "react";
import { List, Typography } from "@mui/material";
import { useLayoutContext } from "hooks";
import useStyles from "./styles";

type SidebarSubmenuProps = {
  submenuTitle: string;
  isSubSidebar: boolean;
  children: React.ReactNode;
};

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  submenuTitle,
  isSubSidebar,
  children,
}) => {
  const { classes, cx } = useStyles();
  const layoutContext = useLayoutContext();

  return (
    <div className={classes.submenu}>
      <Typography
        className={cx(
          classes.submenuTitle,
          isSubSidebar || layoutContext.menuOpen ? null : classes.menuClosed,
        )}
      >
        {submenuTitle}
      </Typography>
      <List className={classes.submenuList}>{children}</List>
    </div>
  );
};

export default SidebarSubmenu;
