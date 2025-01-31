import { pink } from "@mui/material/colors";
import { createTheme, adaptV4Theme } from "@mui/material/styles";
console.log(pink);
pink.mainGradient = `linear-gradient(to left, ${pink[500]}, ${pink[200]})`;
const theme = createTheme(
  adaptV4Theme({
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
        mainGradient:
          "linear-gradient(to left, rgb(0 126 255), rgb(2, 214, 242))",
        mainGradientReverse:
          "linear-gradient(to left, rgb(2, 214, 242), rgb(0 126 255))",
        darkGradient: "linear-gradient(to left, rgb(0 98 197), rgb(2 175 197))",
        dark: "#0185a9",
        light: "#34cbf4",
        lightGradient:
          "linear-gradient(to left, rgb(152 199 247), rgb(177 244 253))",
        lightGradientReverse:
          "linear-gradient(to left, rgb(177 244 253), rgb(152 199 247))",
        extraLight: "#def4fd",
        contrastText: "#fff",
      },
      secondary: {
        dark: "#b29c3c",
        main: "#ffe057",
        light: "#ffe678",
        extraLight: "#fdf6a7",
        xxLight: "#fffef3",
      },
      error: pink,
      // secondary: {
      //   main: "#aaa",
      // },
      // third: {
      //   main: "#aaa",
      // },
    },
    shape: {
      borderRadius: 7,
    },
    customViewSize: "calc(100vh - 72px)",
    // spacing: { spacing: 4 },
  })
);
theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontSize: "0.875rem",
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
        background: "#f7f7f7",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {
        // "& form": { display: "grid", gap: "1em" },
        '& .MuiButton-root[type="submit"]': {
          // fontWeight: 900,
          // color: "white",
          // borderRadius: 0,
          [theme.breakpoints.down(450)]: {
            // position: "fixed",
            // left: "0",
            // bottom: 0,
            // width: "100%",
            // zIndex: 10,
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 50 },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        minHeight: "72px",
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        padding: "0px 9px",
      },
      indicator: {
        height: "8px",
        borderRadius: "4px 4px 0 0",
        background: theme.palette.primary.mainGradient,
      },
    },
  },
};

export default theme;
