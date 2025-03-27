import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "listItemButtons">()(
  (_, _params, classes) => ({
    listItem: {
      padding: "23px 30px",
      borderBottom: "1px solid #eaeaea",
      transition: "0.3s",
      position: "relative",
      "&:last-child": {
        borderBottom: "none",
      },
      "&:hover": {
        backgroundColor: "#fbfbfb",
      },
      [`&:hover .${classes.listItemButtons}`]: {
        opacity: 1,
      },
    },
    listItemContent: {
      display: "flex",
      padding: "5px 0",
      position: "relative",
      margin: "10px 0",
    },
    listItemButtons: {
      position: "absolute",
      right: "30px",
      top: "50%",
      transform: "translate3d(0,-49%,0)",
      MozTransformOrigin: "translate3d(0,-50%,0)",
      opacity: 0,
      transition: "0.4s",
      "& > *:not(:first-child)": {
        marginLeft: 15,
      },
    },
    clickable: {
      cursor: "pointer",
    },
  }),
);

export default useStyles;
