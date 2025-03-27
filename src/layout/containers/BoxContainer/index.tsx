import { CSSProperties, FC, ReactNode, RefObject } from "react";
import useStyles from "./styles";

type BoxContainerProps = {
  boxID?: string;
  className?: string;
  children: ReactNode;
  inTab?: boolean;
  inBox?: boolean;
  boxWidth?: number | "full" | "xs" | "sm" | "md" | "lg" | "xl";
  boxMinWidth?:
    | number
    | "full"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | (string & {});
  boxAlignment?: "center" | "flex-start" | "flex-end";
  boxCollapsed?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: boolean;
  style?: CSSProperties;
  ref?: RefObject<HTMLDivElement>;
};

const BoxContainer: FC<BoxContainerProps> = ({
  boxID,
  className,
  children,
  inTab = false,
  inBox = false,
  boxWidth = "full",
  boxMinWidth = "lg",
  boxAlignment = "center",
  boxCollapsed,
  paddingHorizontal,
  paddingVertical,
  paddingTop = false,
  style,
  ref,
}) => {
  const { classes, cx } = useStyles({
    inTab,
    inBox,
    boxWidth,
    boxMinWidth,
    boxAlignment,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    boxCollapsed,
  });

  return (
    <div
      ref={ref}
      id={boxID}
      className={cx(classes.boxContainer, className)}
      style={style}
    >
      <div className={classes.boxContainerContent}>{children}</div>
    </div>
  );
};

export default BoxContainer;
