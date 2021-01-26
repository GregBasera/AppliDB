import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, Tabs, Tab } from "@material-ui/core";
import logo from "../../tK.png";

import Login from "./Login";
import Signup from "./Signup";

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

  return (
    <Box className={classes.bground} display="flex" justifyContent="center" alignItems="center" css={{ height: "100vh", backgroundColor: "aquamarine" }}>
      <Card raised style={{ width: "400px" }}>
        {/* <CardMedia image={logo} title="TK logo" style={{ height: "140" }} /> */}
        <img mx="auto" height="100" src={logo} alt="TK logo" />

        <Tabs value={tabs} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tabs === 0 ? <Login /> : <Signup />}
      </Card>
    </Box>
  );
}
