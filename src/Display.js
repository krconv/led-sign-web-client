import React from "react";

import { makeStyles, Box } from "@material-ui/core";

import Led from "./Led";

const useStyles = makeStyles(theme => ({
  display: {
    width: "fit-content",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    background: "darkgray",
    minWidth: "300px",
    minHeight: "300px",
    border: "solid 4px black",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "130px",
      minHeight: "130px"
    }
  },
  row: {
    display: "flex"
  }
}));

function Row({ pixels }) {
  const classes = useStyles();

  return (
    <Box className={classes.row}>
      {pixels.map((data, i) => (
        <Led key={i} data={data} />
      ))}
    </Box>
  );
}

export default function Display({ pixels }) {
  const classes = useStyles();

  return (
    <Box className={classes.display}>
      {pixels.map((row, i) => (
        <Row key={i} pixels={row} />
      ))}
    </Box>
  );
}
