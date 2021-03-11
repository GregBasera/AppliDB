import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Users } from "../../endpoints";
import Axios from "axios";

export default function DeleteDialog(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = () => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));
    Axios.delete(`${Users}/${props.id}`, {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    })
      .then((res) => {
        props.del(res.data._id);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>You are about to delete this User.</DialogTitle>
        <DialogContent>
          <Typography paragraph>{`You are about to delete ${props.id}. This will remove the user's access to the system.`}</Typography>

          <Alert severity="warning" style={{ margin: "5px" }}>
            Changes may not be immediately visible. Reload the page if nessesary.
          </Alert>
          <Alert severity="error" style={{ margin: "5px" }}>
            THIS CAN NOT BE UNDONE.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
