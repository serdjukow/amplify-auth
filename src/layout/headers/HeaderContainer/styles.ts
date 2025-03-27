import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  headerContainer: {
    position: "fixed",
    top: 0,
    backgroundColor: "#fff",
    width: "100%",
    zIndex: 1100,
    "@media print": {
      display: "none",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerContainerAuthLayout: {
    width: "100%",
  },
  headerContainerMenuOpen: {
    width: "calc(100% - 300px)",
    marginLeft: 300,
  },
  headerContainerSubMenuOpen: {
    width: "calc(100% - 369px)",
    marginLeft: 369,
  },
  headerContainerMenuClosed: {
    width: "calc(100% - 70px)",
    marginLeft: 70,
  },
  header: {
    boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.12)",
    position: "relative",
    padding: "13px 0 13px 0",
    zIndex: 999,
    fontSize: 16,
    height: 80,
  },
  container: {
    width: "100%",
    margin: 0,
    padding: "0 30px",
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: "100%",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '" "',
      display: "table",
    },
    "&::after": {
      content: '" "',
      display: "table",
      clear: "both",
    },
  },
}));

export default useStyles;
