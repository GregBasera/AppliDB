import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation, useHistory } from "react-router-dom";
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
          {currPath === "/home" ? "admin panel" : "home"}
        </Button>
      </Link>
    );
  }
  return null;
}

export default function AppNavBar() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const tabchange = (event, newValue) => {
    setTab(newValue);
  };

  let history = useHistory();
  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    // your session was deleted. Please reload the page and log back in.
    history.replace("/auth");
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6">LGUTK-HRMO AppliDB</Typography>

        <Box className={classes.title} style={{ marginLeft: "50px" }}>
          <Tabs value={tab} onChange={tabchange}>
            <Tab label="Applicants" />
            <Tab label="JO Personel" />
          </Tabs>
        </Box>

        {/* Admin Panel / Home Button */}
        {accessPrivs(useLocation().pathname)}
        {/* Logout button */}
        <Button variant="contained" onClick={handleLogout} style={{ backgroundColor: "gray", color: "white", marginLeft: "20px" }}>
          log-out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
