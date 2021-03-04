import React, { useState } from "react";
import { ListItem, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function ExpandedListItems({ obj, editMode }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return Object.entries(obj).map((e) => (
    <ListItem key={e[0]}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          {editMode ? (
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          ) : null}
          <Typography color="textSecondary">{e[0]}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{e[1]}</Typography>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <Typography>hello</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  ));
}
