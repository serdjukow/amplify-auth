import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  action: {
    marginRight: theme.spacing(2),
    "@media (min-width: 960px) and (max-width: 1049.95px)": {
      marginRight: 0,
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
      fontWeight: 700,
      bottom: 3,
      right: 3,
      backgroundColor: theme.palette.primary.light,
    },
  },
  icon: {
    height: 29,
    width: 29,
    verticalAlign: "text-bottom",
    color: theme.palette.primaryGrey.main,
  },
  buttonText: {
    fontSize: 15,
  },
}));

export default useStyles;
