import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  submenu: {
    margin: "15px 0 0 0",
  },
  submenuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  submenuTitle: {
    padding: "0 30px",
    marginBottom: 5,
    display: "block",
    color: "#758187",
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "1px",
    textAlign: "left",
    fontFamily: "Raleway,-apple-system,BlinkMacSystemFont, Segoe UI",
    opacity: 1,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuClosed: {
    opacity: 0,
  },
}));

export default useStyles;
