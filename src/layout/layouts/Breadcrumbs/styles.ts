import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  breadcrumbs: {
    margin: "0 0 0 0",
  },
  breadcrumbsGiessPlan: {
    margin: "0 0 0 300px",
  },
  breadcrumbLink: {
    textDecoration: "none",
    color: "#333",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  breadcrumbLinkNormal: {
    fontSize: 16,
  },
  breadcrumbLinkSmall: {
    fontSize: 14,
    lineHeight: "2.1",
  },
  breadcrumbNameNormal: {
    fontSize: 16,
  },
  breadcrumbNameSmall: {
    fontSize: 14,
    lineHeight: "2.1",
  },
  arrowIcon: {
    transform: "rotate(-90deg)",
    color: "#bac7cc",
    verticalAlign: "middle",
  },
  arrowIconNormal: {
    height: 16,
    width: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: -2,
    "& path": {
      strokeWidth: 1.5,
    },
  },
  arrowIconSmall: {
    height: 12,
    width: 12,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -1,
    "& path": {
      strokeWidth: 1.3,
    },
  },
  loadingName: {
    "&:empty": {
      height: 24,
      width: "150px",
      cursor: "progress",
      display: "inline-block",
      background:
        "linear-gradient(0.25turn, transparent, #fff, transparent), linear-gradient(#D3D8DB, #D3D8DB), radial-gradient(38px circle at 19px 19px, #fff 50%, transparent 51%), linear-gradient(#fff, #fff)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "315px 250px, 315px 180px, 100px 100px, 225px 30px",
      backgroundPosition: "-315px 0, 0 0, 0px 190px, 50px 195px",
      animation: "shimmer 1s infinite",
      content: '""',
      verticalAlign: "middle",
      marginTop: -2,
    },
  },
  breadcrumbsContent: {
    display: "inline-block",
  },
  homeLink: {
    lineHeight: "20px",
    verticalAlign: "bottom",
  },
  homeIcon: {
    height: 25,
    width: 25,
  },
}));

export default useStyles;
