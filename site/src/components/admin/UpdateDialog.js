import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Roles, Users } from "../../endpoints";

export default function UpdateDialog(props) {
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState(props.currRole);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    // get defined roles
    let auth = JSON.parse(sessionStorage.getItem("auth"));
    Axios.get(Roles, {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    })
      .then((res) => {
        setRoles(res.data.roles);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {}; // cleanup
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const roleChange = (e) => {
    setNewRole(e.target.value);
  };

  const updateUser = () => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));
    Axios.put(
      `${Users}/${props.id}`,
      {
        role: newRole,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        update role
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Typography paragraph>{`Update User#${props.id} from '${props.roleName}' to:`}</Typography>

          <FormControl variant="outlined" fullWidth>
            <InputLabel>New role</InputLabel>
            <Select value={newRole} onChange={roleChange} label="New role">
              {roles
                ? roles.map((role) => {
                    return role.name !== "Authenticated" && role.name !== "Public" ? (
                      <MenuItem key={role.id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ) : null;
                  })
                : null}
            </Select>
          </FormControl>

          <Alert severity="warning" style={{ margin: "5px" }}>
            Changes may not be immediately visible. Reload the page if nessesary.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateUser} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
