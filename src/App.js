import React from "react";

import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

import Main from "./Main";
import { CssBaseline, Box } from "@material-ui/core";

let theme = createMuiTheme({
  typography: {
    fontFamily: ["-apple-system", "Segoe UI", "Roboto", "sans-serif"],
    h1: {
      fontWeight: "300",
      fontSize: "64px"
    },
    h2: {
      fontWeight: "300",
      fontSize: "36px"
    },
    h6: {
      fontWeight: "400",
      fontSize: "28px"
    },
    body1: {
      fontWeight: "300",
      fontSize: "24px"
    }
  }
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh"
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </Box>
  );
}
