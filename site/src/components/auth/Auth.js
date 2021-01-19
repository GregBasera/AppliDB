import React, { useState } from "react";
import { Box, Card, Tabs, Tab, Typography, CardContent } from "@material-ui/core";

import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
  const [tabs, setTabs] = useState(0);
  const handleChange = (event, newValue) => {
    setTabs(newValue);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" css={{ height: "100vh", backgroundColor: "aquamarine" }}>
      <Card raised>
        <CardContent>
          <Typography align="center" variant="h2">
            LGUTK-HRMO AppliDB
          </Typography>
        </CardContent>

        <Tabs value={tabs} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tabs === 0 ? <Login /> : <Signup />}
      </Card>
    </Box>
  );
}
