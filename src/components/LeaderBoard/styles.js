import { makeStyles } from "@material-ui/styles";
export default makeStyles((theme) => ({
  background: {
    background: "linear-gradient(45deg, rgb(2 214 242), #ffe0577a)",
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root:first-of-type": {
        "& .MuiLink-underlineHover": { fontWeight: "bolder", color: "#0299f2" },
        borderTop: "3px solid #c4a7fd",
        borderBottom: "3px solid #efd4ff",
        background: "#c3a7fd57",
        fontWeight: "bolder",
      },
      "& .MuiTableRow-root:nth-of-type(2)": {
        "& .MuiLink-underlineHover": {
          fontWeight: "bolder",
          color: "#0299f2",
        },
        borderBottom: "3px solid #f4e1fffa",
        background: "#c3a7fd38",
        fontWeight: "bolder",
      },
      "& .MuiTableRow-root:nth-of-type(3)": {
        "& .MuiLink-underlineHover": {
          fontWeight: "bolder",
          color: "rgb(0 184 255)",
        },
        borderBottom: "2px solid #f6e7fd",
        background: "#f2ecfe8a",
        fontWeight: "bolder",
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
