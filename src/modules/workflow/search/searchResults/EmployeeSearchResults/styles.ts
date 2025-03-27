import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "toSearchIcon">()(
  (theme, _params, classes) => ({
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
      padding: "30px 0",
    },
    noResultsContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 30px",
    },
    noResultsTitle: {
      color: "#7e8299",
      fontWeight: 600,
      textAlign: "center",
    },
    noResultsText: {
      color: "#a1a5b7",
      textAlign: "center",
      fontSize: 13,
    },
    noResultsIcon: {
      width: 70,
      height: 70,
      color: theme.palette.primaryGrey.main,
      marginBottom: 21,
    },
    resultsContent: {
      "&:not(:first-child)": {
        marginTop: 33,
      },
    },
    resultsHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "end",
      marginBottom: 15,
      paddingLeft: 20,
    },
    resultsTitle: {
      textAlign: "left",
      fontWeight: 600,
      margin: "0px !important",
    },
    resultsIcon: {
      width: 27,
      height: 27,
      color: theme.palette.primaryGrey.main,
      marginRight: 10,
    },
    resultList: {
      margin: 0,
      padding: 0,
      "& li": {
        listStyle: "none",
        borderTop: "1px solid #eaeaea",
        padding: "15px 30px",
      },
      "& li:last-child": {
        borderBottom: "1px solid #eaeaea",
      },
      "& li:hover": {
        backgroundColor: "#fbfbfb",
      },
    },
    resultLink: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    resultName: {
      fontWeight: 500,
      marginRight: 40,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: 300,
    },
    resultSubname: {},
    resultSubInfo: {
      color: "#878787",
      fontSize: 14,
    },
    resultInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      color: "#878787",
      fontSize: 14,
    },
    resultInfo1: {
      marginRight: 15,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: 200,
    },
    resultInfo2: {},
    expansionIdIcon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    loadMore: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 15,
      marginRight: 15,
    },
    toSearchLink: {
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 50,
      padding: "5px 12px",
      border: "1px solid " + theme.palette.primaryGrey.main,
      color: theme.palette.primaryGrey.main,
      fontSize: 13,
      "&:hover": {
        border: "1px solid " + theme.palette.primary.main,
        [`& .${classes.toSearchIcon}`]: {
          color: theme.palette.primary.main,
        },
      },
    },
    toSearchIcon: {
      width: 19,
      height: 19,
      marginLeft: 7,
      color: theme.palette.primaryGrey.main,
      transition: "all 0.2s ease-in-out",
    },
  }),
);

export default useStyles;
