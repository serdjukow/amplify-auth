import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  popper: {
    zIndex: 1111,
    position: "absolute !important" as "absolute",
    top: "70px !important",
  },
  paper: {
    boxShadow: "0 0 50px 0 rgb(82 63 105 / 15%)",
    borderRadius: 7,
    maxHeight: "calc(100vh - 100px)",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "40px 30px 25px 30px",
  },
  searchFilterTitle: {
    textAlign: "left",
    fontWeight: 600,
    marginBottom: 21,
    minWidth: 300,
  },
  filterItem: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    margin: 0,
    borderBottom: "1px solid #eff2f5 !important",
    padding: "10px 0",
  },
  filterLabel: {
    fontWeight: 600,
  },
  buttons: {
    marginTop: 25,
  },
}));

export default useStyles;
