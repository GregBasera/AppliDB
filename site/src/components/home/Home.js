import React from "react";
import { Redirect } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import HomeTable from "./HomeTable";

export default function Home() {
  if (sessionStorage.getItem("auth") === null) {
    return <Redirect to="/auth" />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">LGUTK-HRMO AppliDB</Typography>
        </Toolbar>
      </AppBar>

      <HomeTable />
    </div>
  );
}
