import React, { useState } from "react";
import Axios from "axios";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, Checkbox, ListItemText } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem, Input, Chip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Applicants } from "../../endpoints";

const eligibilities = [
  "Professional",
  "Sub-Professional",
  "RA 1080 (Bar/Board Eligibility)",
  "Brgy. Official Eligibility",
  "Local Treasury Office Examination",
  "PD 907 (Honor Grad Eligibility)",
  "MC 11, S. 96",
  "NC I-IV",
  "Others",
];

function plainTextField(type, label, name, value, onChange, InputLabelProps) {
  return <TextField variant="outlined" size="small" fullWidth type={type} label={label} name={name} value={value} onChange={onChange} InputLabelProps={InputLabelProps} />;
}

export default function AddAppliBtn() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({});
  const handelFormChange = (e) => {
    switch (e.target.name) {
      case "eligibility":
        setFormData({ ...formData, eligibility: JSON.stringify(e.target.value) });
        break;
      default:
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;
    }
  };

  const handleAddAppli = () => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));

    Axios.post(Applicants, formData, {
      headers: {
        Authorization: "Bearer " + auth.jwt,
      },
    })
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
      <Tooltip title={"Add an Applicant"}>
        <IconButton onClick={handleClick} color="secondary">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
        <DialogTitle onClose={handleClose}>Add an Applicant</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              {plainTextField("date", "Date Applied", "date_applied", formData.date_applied ?? "", handelFormChange, { shrink: true })}
            </Grid>
            <Grid item xs={5}>
              {plainTextField("text", "Applying for", "applying_for", formData.applying_for ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={5}>
              {plainTextField("text", "Where did you hear about us?", "referral", formData.referral ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={3}>
              {plainTextField("text", "Lastname", "lname", formData.lname ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Firstname", "fname", formData.fname ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Middlename", "mname", formData.mname ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Civil Status</InputLabel>
                <Select name="civil_status" value={formData.civil_status ?? ""} onChange={handelFormChange} label="Civil Status">
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Separated">Separated</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select name="sex" value={formData.sex ?? ""} onChange={handelFormChange} label="Sex">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              {plainTextField("date", "Birthdate", "birthdate", formData.birthdate ?? "", handelFormChange, { shrink: true })}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Birthplace", "birthplace", formData.birthplace ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={2}>
              {plainTextField("text", "Contact Number", "contact_num", formData.contact_num ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("email", "Email address", "email", formData.email ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={12}>
              {plainTextField("text", "Current Address", "curr_address", formData.curr_address ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={4}>
              {plainTextField("text", "Highest Educational Attainment", "nth_edu_attain", formData.nth_edu_attain ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={5}>
              {plainTextField("text", "School Attended", "school", formData.school ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Course / Track", "acad_track", formData.acad_track ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={2}>
              {plainTextField("number", "Year of Graduation", "grad_year", formData.grad_year ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Last Employer", "last_employer", formData.last_employer ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Position Held", "position_held", formData.position_held ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={2}>
              {plainTextField("number", "Serv Duration(mons)", "serv_duration_mon", formData.serv_duration_mon ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={2}>
              {plainTextField("text", "Application Status", "appli_status", formData.appli_status ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Eligibility(s)</InputLabel>
                <Select
                  name="eligibility"
                  multiple
                  value={formData.eligibility ? JSON.parse(formData.eligibility) : []}
                  onChange={handelFormChange}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip key={value} label={value} color="secondary" size="small" />
                      ))}
                    </div>
                  )}>
                  {eligibilities.map((name) => (
                    <MenuItem key={name} value={name} dense>
                      <Checkbox checked={(formData.eligibility ?? []).indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button autoFocus onClick={handleAddAppli} color="primary">
            Add Applicant
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
