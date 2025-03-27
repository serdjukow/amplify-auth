import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "loginArrowIcon">()(
  (theme, _params, classes) => ({
    sectionDesktop: {
      display: "none",
      position: "relative",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "end",
      },
    },
    sectionMobile: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      display: "block",
      minWidth: 49,
    },
    userAction: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
    },
    userNameWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    userName: {
      whiteSpace: "nowrap",
      fontSize: 15,
    },
    userRole: {
      color: "#b1aeae",
      lineHeight: "1.1",
      fontSize: 13,
    },
    action: {
      marginRight: theme.spacing(2),
      "@media (min-width: 960px) and (max-width: 1049.95px)": {
        marginRight: 0,
      },
    },
    styledMenu: {
      // boxShadow: "0px 3px 6px #00000029",
      // border: "1px solid #F1F1F3",
    },
    messagesIcon: {},
    settingsIcon: {
      color: theme.palette.text.secondary,
      marginLeft: 7,
      "& svg": {
        width: 27,
        height: 27,
      },
    },
    badge: {
      "& svg": {
        color: "#c8d3d7",
        width: 27,
        height: 27,
      },
      "& span": {
        padding: 0,
        color: "#fff",
        fontSize: 10,
        bottom: 3,
        right: 3,
      },
    },
    customMenuList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    userHeader: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 200,
    },
    userButtons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      margin: "0 15px",
      "& > div:not(:last-child)": {
        marginRight: 15,
      },
    },
    firstName: {
      fontWeight: 600,
      fontSize: 17,
      marginBottom: 5,
    },
    groupName: {
      fontSize: 14,
      marginBottom: 15,
      lineHeight: "1.1",
      color: "#b1aeae",
    },
    locationName: {
      color: "#8fadb4",
      marginBottom: 15,
    },
    logoutButton: {
      marginTop: 15,
      marginBottom: 15,
    },
    loginButton: {
      [`&:hover .${classes.loginArrowIcon}`]: {
        color: "#ffffff",
        transition: "all 0.2s ease-in-out",
      },
    },
    loginArrowIcon: {
      marginRight: 9,
      color: theme.palette.primary.main,
      transition: "all 0.2s ease-in-out",
      width: 23,
      height: 23,
      marginBottom: -5,
    },
    customMenu: {
      display: "flex",
      zIndex: 999,
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      height: 29,
      width: 29,
      verticalAlign: "text-bottom",
      color: theme.palette.primaryGrey.main,
    },
  })
);

export default useStyles;
