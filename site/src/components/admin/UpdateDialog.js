import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
// import { Users } from "../../endpoints";
// import Axios from "axios";

export default function UpdateDialog(props) {
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState(props.currRole);
  const handleClose = () => {
    setOpen(false);
  };

  const roleChange = () => {
    console.log("change");
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        update role
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Typography paragraph>{`Update User#${props.id} from ${props.currRole} to:`}</Typography>

          <FormControl variant="outlined" fullWidth>
            <InputLabel>New role</InputLabel>
            <Select value={newRole} onChange={roleChange} label="New role">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
          {/* <Button onClick={deleteUser} color="secondary">
            Delete
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
