import React from "react";
import useStyles from "./styles";

type TabContainerProps = {
  children?: React.ReactNode;
  tabContainerValue?: number;
  tabContainerIndex: number;
  style?: React.CSSProperties;
  alignCenter?: boolean;
};

const TabContainer: React.FC<TabContainerProps> = ({
  children,
  tabContainerValue,
  tabContainerIndex,
  style,
  alignCenter,
}) => {
  const { classes } = useStyles();

  // if (tabContainerValue !== undefined && tabContainerValue !== tabContainerIndex) {
  //   return null;
  // }

  return (
    <div
      className={alignCenter ? classes.alignCenter : ""}
      style={{
        ...style,
        display:
          tabContainerValue !== undefined &&
          tabContainerValue !== tabContainerIndex
            ? "none"
            : alignCenter
              ? "flex"
              : "block",
      }}
    >
      {children}
    </div>
  );
};

export default TabContainer;
