import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  "root" | "minus" | "plus" | "successIcon" | "editIcon"
>()((theme, _params, classes) => ({
  root: {
    '& input[value=""]': {
      color: theme.palette.text.secondary,
    },
    width: "100%",
    backgroundColor: "#fafafc !important",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.4) !important",
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    borderColor: "#a9bebb !important",
    overflow: "hidden",
    height: 40,
  },
  input: {
    position: "relative !important" as "relative",
    textAlign: "center",
    fontSize: "16px  !important",
    width: "100%  !important",
    padding: `10px 12px 10px 12px !important`,
    MozAppearance: "textfield",
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
  focusedInput: {
    boxShadow: "0 0 5px rgba(183, 216, 224, 0.4) !important",
    borderColor: "#a9bebb !important",
  },
  formControlRoot: {
    width: "100%",
  },
  numberFieldWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  minus: {
    backgroundColor: "#fafafc",
    borderColor: "#a9bebb",
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 2,
    "&:hover": {
      backgroundColor: "#fdf2f4",
    },
    padding: 11,
    "& svg": {
      width: 16,
      height: 16,
    },
  },
  plus: {
    backgroundColor: "#fafafc",
    borderColor: "#a9bebb",
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    marginLeft: 2,
    "&:hover": {
      backgroundColor: "#eaf0f2",
    },
    padding: 11,
    "& svg": {
      width: 16,
      height: 16,
    },
  },
  disabled: {
    color: theme.palette.text.secondary,
    borderColor: "#eff3f4 !important",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#fafafc",
    },
  },
  inputError: {
    [`& .${classes.root}`]: {
      boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
      borderColor: "#ead6da !important",
      backgroundColor: "#f9f4f4 !important",
    },
    [`& .${classes.minus}`]: {
      borderColor: "#ead6da !important",
    },
    [`& .${classes.plus}`]: {
      borderColor: "#ead6da !important",
    },
  },
  inputSuccess: {
    [`& .${classes.root}`]: {
      boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
      borderColor: "#b2d6be !important",
      backgroundColor: "#f7f9f8 !important",
    },
    [`& .${classes.minus}`]: {
      borderColor: "#b2d6be !important",
    },
    [`& .${classes.plus}`]: {
      borderColor: "#b2d6be !important",
    },
    [`& .${classes.successIcon}`]: {
      MozAnimation: `hideAnimation 0.7s ease-out 5s forwards`,
      WebkitAnimation: `hideAnimation 0.7s ease-out 5s forwards`,
      OAnimation: `hideAnimation 0.7s ease-out 5s forwards`,
      animation: `hideAnimation 0.7s ease-out 5s forwards`,
      WebkitAnimationFillMode: "forwards",
      animationFillMode: "forwards",
    },
  },
  successIcon: {
    color: "#5dd889 !important",
    width: 25,
    height: 25,
    marginRight: 5,
    "& path": {
      strokeDasharray: 65,
      strokeDashoffset: 65,
      animation: `lineAnimation 1.3s ease-out forwards`,
    },
  },
  errorIcon: {
    color: theme.palette.red.main,
    width: 25,
    height: 25,
    marginRight: 5,
    "& path": {
      strokeDasharray: 27,
      strokeDashoffset: 27,
      animation: `lineAnimation 1.3s ease-out forwards`,
    },
  },
  positionStart: {
    margin: 0,
    pointerEvents: "none",
  },
  unitAdornment: {
    fontWeight: 500,
    padding: "10px 7px",
    backgroundImage: "linear-gradient(to top, #f1f1f1, #fcfcfc)",
    borderLeft: "1px solid #a9bebb",
    color: "#969696",
    pointerEvents: "none",
    fontSize: 15,
    fontFamily: "Raleway",
  },
  editButton: {
    padding: 0,
    marginLeft: 10,
    "&:hover": {
      background: "none",
    },
    [`& .${classes.editIcon}`]: {
      color: theme.palette.primary.main,
    },
    [`&:hover .${classes.editIcon}`]: {
      color: theme.palette.primary.dark,
    },
  },
  editIcon: {
    width: 23,
    height: 23,
  },
  entityPrefix: {
    fontWeight: 600,
    marginRight: 15,
  },
  description: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
}));

export default useStyles;
