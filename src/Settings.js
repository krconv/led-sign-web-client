import React, { useEffect } from "react";
import { Box, Typography, TextField, makeStyles } from "@material-ui/core";
import cookie from "react-cookies";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  fields: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: "150px"
  }
}));

export default function Settings({
  protocol,
  setProtocol,
  host,
  setHost,
  secret,
  setSecret
}) {
  const classes = useStyles();

  useEffect(() => {
    setProtocol(cookie.load("protocol"));
    setHost(cookie.load("host"));
    setSecret(cookie.load("secret"));
  }, [setProtocol, setHost, setSecret]);

  useEffect(() => {
    cookie.save("protocol", protocol);
    cookie.save("host", host);
    cookie.save("secret", secret);
  }, [protocol, host, secret]);

  return (
    <Box className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Settings
      </Typography>
      <Box className={classes.fields}>
        <TextField
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
          label="Protocol"
          placeholder="https"
          value={protocol}
          onChange={e => setProtocol(e.target.value)}
        />
        <TextField
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
          label="Host"
          placeholder="example.com"
          value={host}
          onChange={e => setHost(e.target.value)}
        />
        <TextField
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
          label="Secret"
          value={secret}
          placeholder="shhhh"
          onChange={e => setSecret(e.target.value)}
        />
      </Box>
    </Box>
  );
}
