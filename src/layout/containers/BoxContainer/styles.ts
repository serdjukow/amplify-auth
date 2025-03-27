import { makeStyles } from "tss-react/mui";

type StyleProps = {
  boxWidth: number | "full" | "xs" | "sm" | "md" | "lg" | "xl";
  boxMinWidth:
    | number
    | "full"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | (string & {});
  boxAlignment: "center" | "flex-start" | "flex-end";
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: boolean;
  inTab?: boolean;
  inBox?: boolean;
  boxCollapsed?: boolean;
};

const useStyles = makeStyles<StyleProps>()(
  (
    _,
    {
      inTab,
      inBox,
      boxWidth,
      boxMinWidth,
      boxAlignment,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      boxCollapsed,
    },
  ) => ({
    boxContainer: {
      width: "100%",
      display: "flex",
      justifyContent: boxAlignment,
    },
    boxContainerContent: {
      borderRadius: inTab ? "0 5px 5px 5px" : 5,
      background: inBox ? "transparent" : "white",
      boxShadow: inBox ? "none" : "0 0 12px 0 rgba(0,0,0,0.09)",
      paddingTop: paddingTop ? paddingVertical : 0,
      paddingRight: paddingHorizontal,
      paddingLeft: paddingHorizontal,
      paddingBottom: boxCollapsed ? 0 : paddingVertical,
      maxWidth:
        boxWidth === "full"
          ? "100%"
          : boxWidth === "xs"
            ? 320
            : boxWidth === "sm"
              ? 600
              : boxWidth === "md"
                ? 960
                : boxWidth === "lg"
                  ? 1280
                  : boxWidth === "xl"
                    ? 1920
                    : boxWidth,
      minWidth:
        boxMinWidth === "full"
          ? "100%"
          : boxMinWidth === "xs"
            ? 320
            : boxMinWidth === "sm"
              ? 600
              : boxMinWidth === "md"
                ? 960
                : boxMinWidth === "lg"
                  ? 1280
                  : boxMinWidth === "xl"
                    ? 1920
                    : boxMinWidth,
    },
  }),
);

export default useStyles;
