import React from "react";
import HeaderLogo from "../HeaderLogo";
import useStyles from "./styles";

type HeaderLeftProps = {
  layoutType: "layout" | "authLayout";
  children?: React.ReactNode;
};

const HeaderLeft: React.FC<HeaderLeftProps> = ({ children, layoutType }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.headerLeftSide}>
      {layoutType === "authLayout" && <HeaderLogo layoutType={layoutType} />}
      {children}
    </div>
  );
};

export default HeaderLeft;
