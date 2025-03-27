import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  card: {
    backgroundColor: "#fff",
    color: "#1C252E",
    padding: 24,
    borderRadius: 16,
    boxShadow:
      "0px 0px 2px 0px rgba(145 158 171 / 0.2), 0px 12px 24px -4px rgba(145 158 171 / 0.12)",
    minWidth: 648,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default useStyles;
