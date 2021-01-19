import React from "react";
import { Redirect } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function Home() {
  if (sessionStorage.getItem("auth") === null) {
    return <Redirect to="/auth" />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
