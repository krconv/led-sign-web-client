import React from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontWeight: "bolder"
  },
  value: {
    marginLeft: theme.spacing(1),
    textTransform: "uppercase"
  },
  indicator: {
    marginLeft: theme.spacing(1),
    width: "16px",
    height: "16px",
    borderRadius: "8px"
  },
  loading: {
    backgroundColor: "grey"
  },
  connected: {
    backgroundColor: "green"
  },
  disconnected: {
    backgroundColor: "red"
  },
  error: {
    color: "red"
  }
}));

export default function Status({ status, error }) {
  const classes = useStyles();

  const indicatorClasses = clsx({
    [classes.indicator]: true,
    [classes.loading]: status === "loading",
    [classes.connected]: status === "connected",
    [classes.disconnected]: status === "disconnected"
  });

  return (
    <Box className={classes.root}>
      <Box className={classes.main}>
        <Typography className={classes.label} variant="body1">
          Status:
        </Typography>
        <Box className={indicatorClasses} />
        <Typography className={classes.value} variant="body1">
          {status}
        </Typography>
      </Box>

      {error && (
        <Typography className={classes.error} variant="body1">
          {error}
        </Typography>
      )}
    </Box>
  );
}
