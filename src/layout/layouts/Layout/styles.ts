import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  App: {
    display: "flex",
    minHeight: "100vh",
  },
  dashboard: {
    paddingTop: "80px",
    flexWrap: "wrap",
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
    width: "100%",
    "@media print": {
      padding: 0,
      backgroundColor: "#fff",
    },
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: "40px 45px 90px 45px",
    position: "relative",
    zIndex: 10,
    height: "100%",
    marginLeft: "300px",
    "@media print": {
      margin: 0,
      padding: 0,
    },
  },
  contentContainerMenuClosed: {
    margin: "0 0 0 45px",
    "@media print": {
      margin: 0,
    },
  },
  authContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    padding: "40px 45px 0 45px",
    position: "relative",
    zIndex: 10,
    height: "100%",
  },
  giessPlanContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    padding: "15px 15px 0 15px",
    position: "relative",
    zIndex: 10,
    height: "100%",
  },
  content: {
    width: "100%",
    "@media print": {
      height: "100%",
    },
  },
}));

export default useStyles;
