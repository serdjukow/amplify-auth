import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  drawer: {
    boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
    zIndex: 11,
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
    backgroundColor: "#2a2a2a",
    position: "relative",
    padding: "20px 0 0 0",
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
}));

export default useStyles;
