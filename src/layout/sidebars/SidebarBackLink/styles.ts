import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "listItemText" | "listItemIcon">()(
  (theme, _params, classes) => ({
    listItem: {
      color: "#25353D",
      borderLeft: "4px solid transparent",
      padding: "11px 11px 11px 22px !important",
      transition: "0.3s",
      lineHeight: "24px",
      marginTop: 15,
      cursor: "pointer",

      "&:hover": {
        color: "#fff",
        borderColor: "#b38531",
        backgroundColor: "#45545C",

        [`& .${classes.listItemText}`]: {
          color: "#fff",
        },
        [`& .${classes.listItemIcon}`]: {
          color: "#fff",
        },
      },
    },
    listItemClosed: {
      padding: "11px 11px 11px 19px !important",
    },
    listItemText: {
      color: "#25353D",
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
    listItemIcon: {
      marginRight: 12,
      color: "#25353D",
      minWidth: "unset",
      fontSize: 16,
      fontWeight: 400,
      transition: theme.transitions.create(["color"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      "& svg": {
        width: 35,
        height: 35,
        marginLeft: -5,
      },
    },
  }),
);

export default useStyles;
