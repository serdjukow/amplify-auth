import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  filterContainer: {
    right: 0,
    top: 0,
    float: "left",
    position: "relative",
    marginLeft: 15,
  },
  filter: { display: "inline-block", float: "right" },
}));

export default useStyles;
