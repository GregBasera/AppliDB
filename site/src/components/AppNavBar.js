import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";

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

function accessPrivs(currPath) {
  let auth = JSON.parse(sessionStorage.getItem("auth"));
  if (auth.user.role.name === "Admin") {
    return (
      <Link to={currPath === "/home" ? "/admin" : "/home"} replace style={{ textDecoration: "none", color: "white" }}>
        <Button color="inherit" startIcon={currPath === "/home" ? <PersonIcon /> : <HomeIcon />}>
          {currPath === "/home" ? "admin" : "home"}
        </Button>
      </Link>
    );
  } else {
    return null;
  }
}

export default function AppNavBar() {
  const classes = useStyles();

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    // your session was deleted. Please reload the page and log back in.
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          LGUTK-HRMO AppliDB
        </Typography>

        {accessPrivs(useLocation().pathname)}
        <Button variant="contained" onClick={handleLogout} style={{ backgroundColor: "gray", color: "white", marginLeft: "20px" }}>
          log-out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
