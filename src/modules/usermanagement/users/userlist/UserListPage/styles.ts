import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  boxHeadlineContainer: {
    [theme.breakpoints.down("md")]: {
      background: "none !important",
      boxShadow: "none",
    },
  },
}));

export default useStyles;
