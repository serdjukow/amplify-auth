import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  listItem: {
    color: "#eee",
    padding: "8px 15px 6px 15px !important",
    transition: "0.3s",
    lineHeight: "24px",
    backgroundColor: "#25353D",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#303F47",
    },
  },
  listItemClosed: {
    padding: "11px 11px 11px 10px !important",
  },
  title: {
    fontSize: 18,
    color: "#eee",
    textAlign: "left",
  },
  subTitle: {
    color: "#758187",
    textAlign: "left",
    fontSize: 16,
  },
  icon: {
    marginRight: 12,
    color: "#eee",
    minWidth: "unset",
    fontSize: 16,
    fontWeight: 400,
    "& svg": {
      width: 45,
      height: 45,
    },
  },
  listItemText: {
    textAlign: "left",
    minWidth: 210,
    opacity: 1,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuClosed: {
    opacity: 0,
  },
  titleLoading: {
    marginBottom: 5,
    "&:empty": {
      height: 28,
      width: "100%",
      cursor: "progress",
      display: "block",
      background:
        "linear-gradient(0.25turn, transparent, #758187, transparent), linear-gradient(#45545C, #45545C), radial-gradient(38px circle at 19px 19px, #758187 50%, transparent 51%), linear-gradient(#758187, #758187)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "315px 250px, 315px 180px, 100px 100px, 225px 30px",
      backgroundPosition: "-315px 0, 0 0, 0px 190px, 50px 195px",
      animation: "shimmer 1s infinite",
      content: '""',
    },
  },
  subTitleLoading: {
    "&:empty": {
      height: 25,
      width: 100,
      cursor: "progress",
      display: "block",
      background:
        "linear-gradient(0.25turn, transparent, #758187, transparent), linear-gradient(#3B4A52, #3B4A52), radial-gradient(38px circle at 19px 19px, #758187 50%, transparent 51%), linear-gradient(#758187, #758187)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "315px 250px, 315px 180px, 100px 100px, 225px 30px",
      WebkitBackgroundSize: "315px 250px, 315px 180px, 100px 100px, 225px 30px",
      backgroundPosition: "-315px 0, 0 0, 0px 190px, 50px 195px",
      animation: "shimmer 1s infinite",
      content: '""',
    },
  },
}));

export default useStyles;
