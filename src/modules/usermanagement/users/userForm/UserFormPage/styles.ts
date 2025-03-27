import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  gridItem: {
    marginBottom: 30,
    "&:not(:last-child)": {
      marginRight: 100,
    },
  },
  buttons: {
    marginTop: 99,
  },
  boxDisabledIcon: {
    fontSize: 40,
    marginBottom: 20,
  },
  userBlockIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
    verticalAlign: "text-bottom",
  },
  userEnableIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    verticalAlign: "text-bottom",
  },
  generatedPassword: {
    marginTop: 30,
    marginBottom: 25,
    textAlign: "center",
  },
  createUserSuccessContainer: {
    width: "100%",
    textAlign: "center",
  },
  createUserSuccess: {
    color: "#4caf50",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 33,
    lineHeight: "29px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  createUserSuccessIcon: {
    width: 99,
    height: 99,
    marginBottom: 33,
    color: theme.palette.primary.main,
    "& path": {
      strokeWidth: "1.1",
    },
  },
  registerCollapse: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  createUserSuccessUsername: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 10,
    lineHeight: "29px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "& span": {
      color: "#4caf50",
    },
  },
  createUserSuccessPassword: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 10,
    lineHeight: "29px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "& span": {
      color: "#4caf50",
    },
  },
}));

export default useStyles;
