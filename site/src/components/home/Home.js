import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeTable from "./HomeTable";
import HomeJO from "./joTab/HomeJO";
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

function tabDispenser(ident) {
  switch (ident) {
    case "appli":
      return <HomeTable />;
    case "jo":
      return <HomeJO />;
    default:
      return <HomeTable />;
  }
}

export default function Home() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("appli");

  if (sessionStorage.getItem("auth") === null) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className={classes.root}>
      <AppNavBar changeTab={setSelectedTab} />

      {tabDispenser(selectedTab)}
    </div>
  );
}
