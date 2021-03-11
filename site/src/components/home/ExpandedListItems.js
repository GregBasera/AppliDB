import React, { useState } from "react";
import { ListItem, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
// import { Alert } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";
import { Applicants } from "../../endpoints";
import { headers } from "../../storages";

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

export default function ExpandedListItems({ obj, editMode, appliID, upd }) {
  const [field, setField] = useState(null);
  const [open, setOpen] = useState(false);
  const [changes, setChanges] = useState(null);
  const handleOpen = (entry) => {
    setField(entry);
    setOpen(true);
  };
  const handleClose = () => {
    setChanges(null);
    setOpen(false);
  };

  const fieldIndexer = (c) => {
    switch (c[0]) {
      case "date_applied":
        return <TextField fullWidth type="date" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
      case "birthdate":
        return <TextField fullWidth type="date" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
      case "age":
        return <TextField fullWidth type="number" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
      case "serv_duration_mon":
        return <TextField fullWidth type="number" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
      case "grad_year":
        return <TextField fullWidth type="number" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
      case "email":
        return <TextField fullWidth type="email" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
      case "sex":
        return (
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select name="sex" value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} label="Sex">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        );
      case "civil_status":
        return (
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Civil Status</InputLabel>
            <Select name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} label="Civil Status">
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
            <Select name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} label="Highest Educational Attainment">
              {edu_attain.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return <TextField fullWidth type="text" name={c[0]} value={changes ? changes[c[0]] : c[1]} onChange={changeWatcher} />;
    }
  };

  const changeWatcher = (e) => {
    setChanges({ [e.target.name]: e.target.value });
  };

  const handleUpdate = (id) => {
    Axios.put(`${Applicants}/${id}`, changes, headers())
      .then((res) => {
        upd(res.data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
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
              {field ? fieldIndexer(field) : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={() => handleUpdate(appliID)} color="primary" autoFocus>
            update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
