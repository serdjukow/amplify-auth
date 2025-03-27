import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  listContainer: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    backgroundColor: "#fff",
    borderRadius: "0 0 4px 4px",
  },
}));

export default useStyles;
