import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60px",
    height: "60px",
    borderStyle: "solid",
    borderColor: "#555",
    borderWidth: "1px",
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "45px",
      borderWidth: "0.75px"
    },
    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
      borderRadius: "0.75px"
    }
  }
}));

export default function Led({ data }) {
  const classes = useStyles();
  function convertToRGB(color) {
    var red = (color >> 16) & 0xff;
    var green = (color >> 8) & 0xff;
    var blue = color & 0xff;
    return `rgb(${red}, ${green}, ${blue})`;
  }
  const color = convertToRGB(data);

  return <Box className={classes.root} style={{ backgroundColor: color }} />;
}
