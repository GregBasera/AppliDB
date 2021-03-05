import React, { useState } from "react";
import { ListItem, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const edu_attain = [
  "Graduate Studies Graduate",
  "Graduate Studies Under-Graduate",
  "College Graduate",
  "College Under-Graduate",
  "Vocational/Trade-Course Graduate",
  "Vocational/Trade-Course Under-Graduate",
  "Senior-HS Graduate",
  "Senior-HS Under-Graduate",
  "Junior-HS Graduate",
  "Junior-HS Under-Graduate",
  "Elementary Graduate",
  "Elementary Under-Graduate",
];

export default function ExpandedListItems({ obj, editMode, appliID }) {
  const [field, setField] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (entry) => {
    setField(entry);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fieldIndexer = (c) => {
    switch (c[0]) {
      case "date_applied":
        return <TextField fullWidth type="date" value={c[1]} />;
      case "birthdate":
        return <TextField fullWidth type="date" value={c[1]} />;
      case "age":
        return <TextField fullWidth type="number" value={c[1]} />;
      case "serv_duration_mon":
        return <TextField fullWidth type="number" value={c[1]} />;
      case "grad_year":
        return <TextField fullWidth type="number" value={c[1]} />;
      case "email":
        return <TextField fullWidth type="email" value={c[1]} />;
      case "sex":
        return (
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select name="sex" value={c[1]} label="Sex">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        );
      case "civil_status":
        return (
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Civil Status</InputLabel>
            <Select name="civil_status" value={c[1]} label="Civil Status">
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Separated">Separated</MenuItem>
              <MenuItem value="Widowed">Widowed</MenuItem>
            </Select>
          </FormControl>
        );
      case "nth_edu_attain":
        return (
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Highest Educational Attainment</InputLabel>
            <Select name="nth_edu_attain" value={c[1]} label="Highest Educational Attainment">
              {edu_attain.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return <TextField fullWidth type="text" value={c[1]} />;
    }
  };

  return (
    <React.Fragment>
      {Object.entries(obj).map((e) => (
        <ListItem key={e[0]}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              {editMode ? (
                <Button size="small" color="default" startIcon={<EditIcon />} onClick={() => handleOpen(e)}>
                  {e[0]}
                </Button>
              ) : (
                <Typography color="textSecondary">{e[0]}</Typography>
              )}
            </Grid>
            <Grid item xs={7}>
              <Typography>{e[1]}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Update Applicant #${appliID}`}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Typography color="textSecondary">{field ? field[0] : null}</Typography>
            </Grid>
            <Grid item xs={7}>
              {/* <Typography>{field ? field[1] : null}</Typography> */}
              {field ? fieldIndexer(field) : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
