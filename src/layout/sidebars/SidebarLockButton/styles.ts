import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  sidebarLockButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    position: "fixed",
    top: 65,
    left: 260,
    zIndex: 20,
    transition: theme.transitions.create("left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sidebarLockButtonClosed: {
    left: 30,
  },
  iconButton: {
    padding: 3,
    opacity: 1,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "&:hover svg": {
      color: "#b79b6e",
    },
  },
  menuClosed: {
    opacity: 0,
  },
  lockIcon: {
    width: 25,
    height: 25,
  },
  menuLocked: {
    color: "#b38531",
  },
  menuUnlocked: {
    color: theme.palette.blueGrey.main,
  },
}));

export default useStyles;
