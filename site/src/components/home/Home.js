import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeTable from "./HomeTable";
import AppNavBar from "../AppNavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  if (sessionStorage.getItem("auth") === null) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className={classes.root}>
      <AppNavBar />

      <HomeTable />
    </div>
  );
}
