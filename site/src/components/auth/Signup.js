import React, { useState } from "react";
import Axios from "axios";
import { CardContent, CardActions, TextField, Button, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { Register } from "../../endpoints";

function buildAlert(alert) {
  return <Alert severity={alert.severity}>{alert.msg}</Alert>;
}

export default function Signup() {
  const [pending, setPending] = useState(false);
  const [alert, setAlert] = useState({ enable: false, severity: null, msg: null });
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState();
  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.id]: e.target.value });
    if (e.target.type === "password") setConfirm(e.target.value === signup.password ? false : true);
  };

  let history = useHistory();
  const handleSignup = () => {
    setPending(true);
    setAlert({ ...alert, enable: false });
    let isFilledOut = true;
    Object.entries(signup).forEach((q) => {
      if (q[1] === "") isFilledOut = false;
    });
    isFilledOut = !confirm ? true : false;

    if (isFilledOut) {
      Axios.post(Register, signup)
        .then((res) => {
          setPending(false);
          sessionStorage.setItem("auth", JSON.stringify(res.data));
          history.push("/home");
        })
        .catch((err) => {
          setPending(false);
          setAlert({ enable: true, severity: "error", msg: err.response.data.message[0].messages[0].message });
        });
    } else {
      setAlert({ enable: true, severity: "error", msg: "Please fill up empty fields and confirm password." });
    }
  };

  return (
    <React.Fragment>
      <CardContent>
        <TextField type="text" margin="dense" label="Username" id="username" variant="outlined" value={signup.username} onChange={handleChange} fullWidth />
        <TextField type="email" margin="dense" label="Email" id="email" variant="outlined" value={signup.email} onChange={handleChange} fullWidth />
        <TextField type="password" margin="dense" label="Password" id="password" variant="outlined" value={signup.password} onChange={handleChange} fullWidth />
        <TextField type="password" margin="dense" label="Confirm Password" id="confirm" variant="outlined" error={confirm} onChange={handleChange} fullWidth />
      </CardContent>

      {alert.enable ? buildAlert(alert) : null}

      <CardActions>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSignup}
          startIcon={pending ? <CircularProgress color="inherit" size={15} /> : null}
          fullWidth
          disableFocusRipple>
          Signup
        </Button>
      </CardActions>
    </React.Fragment>
  );
}
