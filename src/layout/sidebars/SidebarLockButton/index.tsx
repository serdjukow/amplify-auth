import React from "react";
import { IconButton } from "@mui/material";
import { useLayoutContext } from "hooks";
import { LockMenuIcon } from "icons";
import useStyles from "./styles";

const SidebarLockButton: React.FC = () => {
  const layoutContext = useLayoutContext();
  const { classes, cx } = useStyles();

  return (
    <div
      className={cx(
        classes.sidebarLockButton,
        layoutContext.menuOpen ? null : classes.sidebarLockButtonClosed,
      )}
    >
      <IconButton
        onClick={() => layoutContext.setMenuLocked(!layoutContext.menuLocked)}
        className={cx(
          classes.iconButton,
          layoutContext.menuOpen ? null : classes.menuClosed,
        )}
      >
        <LockMenuIcon
          className={cx(
            classes.lockIcon,
            layoutContext.menuLocked
              ? classes.menuLocked
              : classes.menuUnlocked,
          )}
        />
      </IconButton>
    </div>
  );
};

export default SidebarLockButton;
