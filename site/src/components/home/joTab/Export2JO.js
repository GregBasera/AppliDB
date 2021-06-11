import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";

export default function Export2JO(props) {
  return (
    <Dialog open={props.open} onClose={() => props.setOpen()}>
      <DialogTitle id="alert-dialog-title">{"Transfer Applicant to JO Database"}</DialogTitle>
      <DialogContent>
        <TextField variant="outlined" fullWidth size="small" label="Department" />
        <TextField variant="outlined" fullWidth size="small" label="Contract starts" />
        <TextField variant="outlined" fullWidth size="small" label="Contract ends" />
        <TextField variant="outlined" fullWidth size="small" label="isActive" />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.setOpen()} color="primary">
          Disagree
        </Button>
        <Button onClick={() => props.setOpen()} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
