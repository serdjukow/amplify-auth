import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  userRoleMenu: {
    width: "100%",
    "& svg": {
      color: "#656565",
      width: 29,
      height: 29,
      marginRight: 15,
    },
  },
  loading: {
    margin: "0 18px 0 5px !important",
    "& svg": {
      color: theme.palette.primary.main,
      width: 21,
      height: 21,
    },
    "& > div": {
      width: "21px !important",
      height: "21px !important",
    },
  },
  selectedRole: {
    "& svg": {
      color: theme.palette.primary.main,
    },
    backgroundColor: "rgba(168, 204, 196, 0.14)",
  },
}));

export default useStyles;
