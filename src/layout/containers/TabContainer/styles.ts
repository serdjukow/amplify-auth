import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  alignCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
