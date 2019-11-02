import React, { useState, useEffect } from "react";

import { Typography, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import streamFrames from "./lib/RenderApi";
import Display from "./Display";
import Status from "./Status";
import Settings from "./Settings";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1)
    }
  }
}));

export default function Main() {
  const classes = useStyles();

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [protocol, setProtocol] = useState("");
  const [host, setHost] = useState("");
  const [secret, setSecret] = useState("");
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    setStatus("loading");
    setError("");
    const subscription = streamFrames(protocol, host, secret).subscribe(
      frame => {
        setPixels(frame);
        setStatus("connected");
      },
      err => {
        setPixels([]);
        setStatus("disconnected");
        setError(err.toString());
      }
    );

    return () => subscription.unsubscribe();
  }, [protocol, host, secret]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h1" gutterBottom>
        LED Sign
      </Typography>
      <Display pixels={pixels} />
      <Status status={status} error={error} />
      <Divider />
      <Settings
        protocol={protocol}
        setProtocol={setProtocol}
        host={host}
        setHost={setHost}
        secret={secret}
        setSecret={setSecret}
      />
    </Paper>
  );
}
