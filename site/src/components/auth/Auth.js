import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, Tabs, Tab, CardContent, Link } from "@material-ui/core";
import logo from "../../tK.png";

import Login from "./Login";
import Signup from "./Signup";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  bground: {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "$gradient 15s ease infinite",
  },
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
});

export default function Auth() {
  const classes = useStyles();
  const [tabs, setTabs] = useState(0);
  const handleChange = (event, newValue) => {
    setTabs(newValue);
  };
  const [store, setStore] = useState(JSON.parse(sessionStorage.getItem("auth")) ?? null);
  const removePrevLogin = () => {
    sessionStorage.removeItem("auth");
    setStore(JSON.parse(sessionStorage.getItem("auth")) ?? null);
  };

  return (
    <Box className={classes.bground} display="flex" justifyContent="center" alignItems="center" css={{ height: "100vh" }}>
      <Card raised style={{ width: "400px" }}>
        {/* <CardMedia image={logo} alt="tK logo" style={{ height: 0, paddingTop: "56.25%" }} /> */}
        <img height="100" src={logo} alt="tK logo" />

        <Tabs value={tabs} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tabs === 0 ? <Login /> : <Signup />}

        {store ? (
          <CardContent style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Alert variant="filled" severity="warning">
              Proceed as
              <Link href="/home">{" " + store.user.username + " "}</Link>
              or
              <Link href="#" onClick={removePrevLogin}>
                {" log-out"}
              </Link>
            </Alert>
          </CardContent>
        ) : null}
      </Card>
    </Box>
  );
}
