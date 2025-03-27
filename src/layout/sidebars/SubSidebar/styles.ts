import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  drawer: {
    boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
    zIndex: 11,
    minHeight: "100vh",
    overflow: "hidden",
    width: 300,
    flexShrink: 0,
    display: "block",
    position: "fixed",
    marginLeft: 69,
    "@media print": {
      display: "none",
    },
  },
  drawerPaper: {
    backgroundColor: "#e7ecef",
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
    "& > *:last-child": {
      marginBottom: 100,
    },
  },
  drawerOpen: {
    width: 300,
    borderRight: "1px solid rgba(126, 160, 168, 0.21)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    borderRight: "1px solid rgba(126, 160, 168, 0.21)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  drawerMenuItems: {
    marginTop: 0,
  },
}));

export default useStyles;
