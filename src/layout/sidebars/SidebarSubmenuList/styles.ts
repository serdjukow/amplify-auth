import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "dropDownIcon">()(
  (theme, _params, classes) => ({
    listItem: {
      color: "#eee",
      borderLeft: "3px solid transparent",
      padding: "11px 27px !important",
      transition: "0.3s",
      lineHeight: "24px",
      cursor: "pointer",

      "&:hover": {
        color: "#fff",
        borderColor: theme.palette.primary.main,
        backgroundColor: "rgba(255,255,255,0.025)",
      },
    },
    listItemClosed: {
      padding: "11px 27px 11px 23px !important",
      [`& .${classes.dropDownIcon}`]: {
        opacity: 0,
      },
    },
    listItemClosedSubmenuOpen: {
      padding: "11px 27px 11px 10px !important",
      [`& .${classes.dropDownIcon}`]: {
        opacity: 0,
      },
    },
    listItemText: {
      color: "#eee",
      textAlign: "left",
      minWidth: 217,
      opacity: 1,
      transition: theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuClosed: {
      opacity: 0,
    },
    listItemIconBefore: {
      marginRight: 12,
      color: "#eee",
      minWidth: "unset",
      fontSize: 16,
      fontWeight: 400,
      "& svg": {
        width: 25,
        height: 25,
        marginLeft: -5,
      },
    },
    dropDownIconWrapper: {
      justifyContent: "flex-end",
      transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      transform: "rotate(0deg)",
      minWidth: 17,
      maxWidth: 17,
      minHeight: 17,
      maxHeight: 17,
      marginRight: 5,
      color: "#bac7cc",
    },
    dropDownIcon: {
      color: "#bac7cc",
      height: 17,
      width: 17,
      opacity: 1,
      transition: theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    dropDownIconExpanded: {
      transform: "rotate(180deg)",
    },
  }),
);

export default useStyles;
