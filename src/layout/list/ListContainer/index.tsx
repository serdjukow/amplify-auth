import React from "react";
import useStyles from "./styles";

type ListContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const ListContainer: React.FC<ListContainerProps> = ({
  className,
  children,
}) => {
  const { classes, cx } = useStyles();

  return <ul className={cx(classes.listContainer, className)}>{children}</ul>;
};
