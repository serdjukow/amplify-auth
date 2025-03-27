import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  drawer: {
    zIndex: 33,
    minHeight: "100vh",
    overflow: "hidden",
    width: 300,
    flexShrink: 0,
    display: "block",
    position: "fixed",
    "@media print": {
      display: "none",
    },
  },
  drawerPaper: {
    backgroundColor: "#1b2b33",
    position: "relative",
    padding: 0,
    minHeight: "100vh",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    maxHeight: "calc(100vh - 80px)",
    overflowY: "scroll",
    display: "block",
    borderRight: "none",
    "& > *:last-child": {
      marginBottom: 100,
    },
  },
  drawerOpen: {
    width: 300,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 70,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  drawerMenuItems: {
    marginTop: 95,
  },
}));

export default useStyles;
