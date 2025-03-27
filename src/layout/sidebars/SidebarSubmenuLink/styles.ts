import { makeStyles } from "tss-react/mui";

type StyleProps = {
  isSubSidebar: boolean;
};

const useStyles = makeStyles<
  StyleProps,
  "listItemText" | "listItemIconBefore"
>()((theme, { isSubSidebar }, classes) => ({
  listItem: {
    color: isSubSidebar ? "#25353D" : "#eee",
    borderLeft: isSubSidebar
      ? "4px solid transparent"
      : "3px solid transparent",
    padding: "11px 27px !important",
    transition: "0.3s",
    lineHeight: "24px",
    cursor: "pointer",

    "&:hover": {
      color: "#fff",
      borderColor: "#b38531",
      backgroundColor: isSubSidebar
        ? "#45545C"
        : "rgba(255,255,255,0.05) !important",

      [`& .${classes.listItemText}`]: {
        color: "#fff",
      },
      [`& .${classes.listItemIconBefore}`]: {
        color: "#fff",
      },
    },
  },
  listItemClosed: {
    padding: "11px 27px 11px 23px !important",
  },
  listItemClosedInSubmenu: {
    padding: "11px 27px 11px 33px !important",
  },
  listItemSelected: {
    color: "#fff",
    borderColor: "#b38531",
    backgroundColor: isSubSidebar
      ? "#45545C"
      : "rgba(255,255,255,0.05) !important",
    [`& .${classes.listItemText}`]: {
      color: "#fff",
    },
    [`& .${classes.listItemIconBefore}`]: {
      color: "#fff",
    },
  },
  listItemText: {
    color: isSubSidebar ? "#25353D" : "#eee",
    textAlign: "left",
    minWidth: 217,
    opacity: 1,
    transition: theme.transitions.create(["opacity", "color"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuClosed: {
    opacity: 0,
  },
  listItemIconBefore: {
    marginRight: 12,
    color: isSubSidebar ? "#25353D" : "#eee",
    minWidth: "unset",
    fontSize: 16,
    fontWeight: 400,
    transition: theme.transitions.create(["color"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& svg": {
      width: 25,
      height: 25,
      marginLeft: -5,
    },
  },
  indented: {
    paddingLeft: "55px !important",
  },
}));

export default useStyles;
