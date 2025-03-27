import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  gridItem: {
    marginBottom: 30,
    "&:not(:last-child)": {
      marginRight: 100,
    },
  },
  buttons: {
    marginTop: 99,
  },
}));

export default useStyles;
