import { makeStyles } from "tss-react/mui";

type HeaderLogoStyleProps = {
  layoutType: "layout" | "authLayout";
};

const useStyles = makeStyles<HeaderLogoStyleProps>()(
  (theme, { layoutType }) => ({
    headerLogoAuthLayout: {
      display: "block",
      backgroundColor: layoutType === "layout" ? "#25353d" : "#fff",
      position: "absolute",
      height: "80px",
      top: 0,
      left: 0,
      margin: 0,
      width: 299,
      float: "left",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    headerLogoLayout: {
      display: "block",
      backgroundColor: "#25353d",
      position: "fixed",
      zIndex: 10,
      height: "80px",
      top: 0,
      left: 0,
      margin: 0,
      width: 300,
      float: "left",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    headerLogoSmall: {
      width: 70,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    logoButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 0,
      overflow: "hidden",
      height: "100%",
      width: "100%",
      borderRadius: "unset !important",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& label": {
        position: "relative",
        maxHeight: 35,
        marginTop: 5,
        width: "auto",
      },
    },
    logoButtonSmall: {
      marginLeft: 0,
    },
    logo: {
      maxHeight: 73,
      maxWidth: 240,
      position: "absolute",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    logoIcon: {
      maxHeight: 60,
      maxWidth: 60,
      position: "absolute",
      opacity: 0,
      transition: theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    logoIconClosed: {
      opacity: 1,
    },
  }),
);

export default useStyles;
