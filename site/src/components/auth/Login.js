import React, { useState } from "react";
import Axios from "axios";
import { CardContent, CardActions, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { Auth } from "../../endpoints";

function buildAlert(alert) {
  return <Alert severity={alert.severity}>{alert.msg}</Alert>;
}

export default function Login() {
  const [alert, setAlert] = useState({ enable: false, severity: null, msg: null });
  const [login, setLogin] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  let history = useHistory();
  const handleLogin = () => {
    setAlert({ ...alert, enable: false });
    let isFilledOut = true;
    Object.entries(login).forEach((q) => {
      if (q[1] === "") isFilledOut = false;
    });

    if (isFilledOut) {
      Axios.post(Auth, login)
        .then((res) => {
          sessionStorage.setItem("auth", JSON.stringify(res.data));
          history.push("/home");
        })
        .catch((err) => {
          console.error(err);
          setAlert({ enable: true, severity: "error", msg: err.response.data.message[0].messages[0].message });
        });
    } else {
      setAlert({ enable: true, severity: "error", msg: "Please fill up empty fields." });
    }
  };

  return (
    <React.Fragment>
      <CardContent>
        <TextField type="text" margin="dense" label="Username or Email" id="identifier" variant="outlined" value={login.identifier} onChange={handleChange} fullWidth />
        <TextField type="password" margin="dense" label="Password" id="password" variant="outlined" value={login.password} onChange={handleChange} fullWidth />
      </CardContent>

      {alert.enable ? buildAlert(alert) : null}

      <CardActions>
        <Button variant="contained" size="large" color="primary" onClick={handleLogin} fullWidth disableFocusRipple>
          Log In
        </Button>
      </CardActions>
    </React.Fragment>
  );
}