import React, { useState } from "react";
import { CardContent, CardActions, TextField, Button } from "@material-ui/core";

export default function Signup() {
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.id]: e.target.value });
  };
  const [confirm, setConfirm] = useState();
  const handleConfirm = (e) => {
    setConfirm(e.target.value === signup.password ? false : true);
  };

  return (
    <React.Fragment>
      <CardContent>
        <TextField type="text" margin="normal" label="Username" id="username" variant="outlined" value={signup.username} onChange={handleChange} fullWidth />
        <TextField type="email" margin="normal" label="Email" id="email" variant="outlined" value={signup.email} onChange={handleChange} fullWidth />
        <TextField type="password" margin="normal" label="Password" id="password" variant="outlined" value={signup.password} onChange={handleChange} fullWidth />
        <TextField type="password" margin="normal" label="Confirm Password" variant="outlined" error={confirm} onChange={handleConfirm} fullWidth />
      </CardContent>

      <CardActions>
        <Button variant="contained" size="large" color="primary" fullWidth disableFocusRipple>
          Signup
        </Button>
      </CardActions>
    </React.Fragment>
  );
}
