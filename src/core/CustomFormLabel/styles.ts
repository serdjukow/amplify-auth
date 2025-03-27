import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "textInputLabel" | "infoIcon">()(
  (theme, _params, classes) => ({
    textInputLabel: {
      color: theme.palette.primary.C200,
      fontSize: "13px",
      textAlign: "left",
      display: "block",
      transform: "none",
      marginBottom: 3,
      whiteSpace: "nowrap",
    },
    inputErrorLabel: {
      color: theme.palette.red.main + " !important",
      [`& .${classes.infoIcon}`]: {
        color: theme.palette.red.main + " !important",
      },
    },
    labelDescription: {
      color: theme.palette.text.secondary,
      fontSize: "13px",
      marginLeft: 3,
    },
    infoButton: {
      padding: 0,
      marginLeft: 10,
    },
    infoIcon: {
      width: 21,
      height: 21,
      color: theme.palette.primary.C200,
    },
    descriptionPopup: {
      padding: 15,
    },
    requiredSymbol: {
      marginLeft: 3,
    },
  }),
);

export default useStyles;
