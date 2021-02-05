import React from "react";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function AddAppliBtn() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title={"Add an Applicant"}>
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
        <DialogTitle onClose={handleClose}>Add an Applicant</DialogTitle>

        <DialogContent dividers>
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField label="Outlined" variant="outlined" size="small" fullWidth />
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Add Applicant
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
