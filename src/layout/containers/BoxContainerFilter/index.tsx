import React from "react";
import useStyles from "./styles";

type BoxContainerFilterProps = {
  children: React.ReactNode;
};

const BoxContainerFilter: React.FC<BoxContainerFilterProps> = ({
  children,
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filter}>{children}</div>
    </div>
  );
};

export default BoxContainerFilter;
