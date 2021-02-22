import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import HomeTable from "./HomeTable";

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

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    // your session was deleted. Please reload the page and log back in.
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            LGUTK-HRMO AppliDB
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            log-out
          </Button>
        </Toolbar>
      </AppBar>

      <HomeTable />
    </div>
  );
}
