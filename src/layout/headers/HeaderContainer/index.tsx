import React from "react";
import { useLayoutContext } from "hooks";
import useStyles from "./styles";

type HeaderContainerProps = {
  layoutType: "layout" | "authLayout";
  children: React.ReactNode;
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  layoutType,
  children,
}) => {
  const layoutContext = useLayoutContext();

  const { classes, cx } = useStyles();
  return (
    <header
      className={cx(
        classes.headerContainer,
        layoutType === "authLayout"
          ? classes.headerContainerAuthLayout
          : layoutContext.subMenuOpen
            ? classes.headerContainerSubMenuOpen
            : layoutContext.menuOpen
              ? classes.headerContainerMenuOpen
              : classes.headerContainerMenuClosed,
      )}
    >
      <div className={classes.header}>
        <div className={classes.container}>{children}</div>
      </div>
    </header>
  );
};

export default HeaderContainer;
