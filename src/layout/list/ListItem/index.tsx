import React from "react";
import useStyles from "./styles";

type ListItemProps = {
  className?: string;
  buttons?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  children: React.ReactNode;
};

export const ListItem: React.FC<ListItemProps> = ({
  className,
  buttons,
  onClick,
  children,
}) => {
  const { classes, cx } = useStyles();

  return (
    <li
      onClick={onClick}
      className={cx(
        classes.listItem,
        className,
        onClick ? classes.clickable : "",
      )}
    >
      <div className={classes.listItemContent}>{children}</div>
      <div className={classes.listItemButtons}>{buttons}</div>
    </li>
  );
};
