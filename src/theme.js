import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme1 = createMuiTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#02bff2",
    },
    secondary: {
      main: green[500],
    },
  },
});
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#02bff2",
    },
    secondary: {
      main: "#aaa",
    },
  },
  shape: {
    // borderRadius: 50,
  },
  // spacing: { spacing: 4 },
});
theme.overrides = {
  MuiButton: {
    root: { borderRadius: 50 },
  },
};

export default theme;
