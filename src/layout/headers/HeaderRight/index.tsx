import React from "react";
import useStyles from "./styles";

type HeaderRightProps = {
  children: React.ReactNode;
};

const HeaderRight: React.FC<HeaderRightProps> = ({ children }) => {
  const { classes } = useStyles();
  return <div className={classes.headerRightSide}>{children}</div>;
};

export default HeaderRight;
