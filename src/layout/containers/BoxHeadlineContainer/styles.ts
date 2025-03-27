import { makeStyles } from "tss-react/mui";

type StyleProps = {
  paddingHorizontal?: number;
  paddingVertical?: number;
  boxTitleSize?: "xsmall" | "small" | "medium" | "big";
  boxBackground?: boolean;
  inTab?: boolean;
  inBox?: boolean;
  boxCollapsed?: boolean;
};

const useStyles = makeStyles<StyleProps>()(
  (
    _,
    {
      paddingHorizontal,
      paddingVertical,
      boxTitleSize,
      boxBackground,
      inTab,
      inBox,
      boxCollapsed,
    },
  ) => ({
    boxContainer: {
      marginTop: 45,
      position: "relative",
    },
    boxIcon: {
      display: "inline-block",
      width: 27,
      height: 27,
      marginRight: 15,
      color: "#9f9f9f",
      "& svg": {
        maxWidth: 27,
        maxHeight: 27,
      },
    },
    boxTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 0,
      margin: 0,
      position: "relative",
      top: 1,
      fontWeight: 500,
      color: "#333",
      fontSize:
        boxTitleSize === "xsmall"
          ? "0.8rem"
          : boxTitleSize === "small"
            ? "1.0rem"
            : "1.1rem",
      lineHeight:
        boxTitleSize === "big"
          ? "32px"
          : boxTitleSize === "medium"
            ? "27px"
            : 1.1,
    },
    boxSubTitle: {
      color: "#c1c1c1",
      fontSize: 14,
    },
    divider: {
      color: "#c1c1c1",
      fontSize: 24,
      fontWeight: "lighter",
      marginLeft: 30,
      marginRight: 10,
    },
    boxSubTitleSmall: {},
    boxSubTitleMedium: {},
    boxSubTitleBig: {},
    headline: {
      width: `calc(100% + ${paddingHorizontal! * 2}px)`,
      left: `-${paddingHorizontal}px`,
      padding: `${
        boxTitleSize === "big" ? 30 : boxTitleSize === "medium" ? 20 : 15
      }px ${
        boxTitleSize === "big" ? 40 : boxTitleSize === "medium" ? 30 : 20
      }px`,
      paddingLeft: inBox
        ? 0
        : boxTitleSize === "big"
          ? 40
          : boxTitleSize === "medium"
            ? 30
            : 20,
      margin: boxCollapsed ? 0 : `0 0 ${paddingVertical}px 0`,
      borderRadius: inTab ? "0 4px 0 0" : "4px 4px 0 0",
      backgroundColor: boxBackground ? "#fcfcfc" : "transparent",
      borderBottom: "1px solid #eaeaea",
      position: "relative",
    },
    boxMenu: {
      position: "absolute",
      float: "right",
      top: "50%",
      transform: "translateY(-50%)",
      right: 33,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      zIndex: 999,
    },
    boxContent: {
      opacity: "1",
    },
    boxDisabled: {
      opacity: "0.4",
      pointerEvents: "none",
      transition: "0.4s",
      position: "relative",
    },
    boxDisabledIcon: {
      fontSize: 40,
      marginBottom: 20,
    },
    boxDisabledIconSmall: {
      width: 99,
      height: 99,
    },
    boxDisabledIconMedium: {
      width: 250,
      height: 250,
    },
    boxDisabledIconBig: {
      width: 388,
      height: 388,
    },
    boxDisabledText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#d59797",
    },
  }),
);

export default useStyles;
