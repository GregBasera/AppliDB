import React, { useState } from "react";
import Axios from "axios";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid } from "@material-ui/core";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAppli = () => {
    // var tempState = formData;
    // tempState.eligibility = JSON.stringify(tempState.eligibility);
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

    // tempState.eligibility = JSON.parse(tempState.eligibility); // have to re-parse the stringified :(
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
              <TextField
                type="date"
                label="Date Applied"
                variant="outlined"
                name="date_applied"
                size="small"
                value={formData.date_applied ?? ""}
                onChange={handelFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField label="Applying for" variant="outlined" name="applying_for" size="small" value={formData.applying_for ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Where did you hear about us?"
                variant="outlined"
                name="referral"
                size="small"
                value={formData.referral ?? ""}
                onChange={handelFormChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={3}>
              <TextField label="Lastname" variant="outlined" name="lname" size="small" value={formData.lname ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Firstname" variant="outlined" name="fname" size="small" value={formData.fname ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Middlename" variant="outlined" name="mname" size="small" value={formData.mname ?? ""} onChange={handelFormChange} fullWidth />
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
              <TextField
                type="date"
                label="Birthdate"
                variant="outlined"
                name="birthdate"
                size="small"
                value={formData.birthdate ?? ""}
                onChange={handelFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Birthplace" variant="outlined" name="birthplace" size="small" value={formData.birthplace ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Contact Number" variant="outlined" name="contact_num" size="small" value={formData.contact_num ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField type="email" label="Email address" variant="outlined" name="email" size="small" value={formData.email ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Current Address" variant="outlined" name="curr_address" size="small" value={formData.curr_address ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Highest Educational Attainment"
                variant="outlined"
                name="nth_edu_attain"
                size="small"
                value={formData.nth_edu_attain ?? ""}
                onChange={handelFormChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField label="School Attended" variant="outlined" name="school" size="small" value={formData.school ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Course / Track" variant="outlined" name="acad_track" size="small" value={formData.acad_track ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>

            <Grid item xs={2}>
              <TextField
                type="number"
                label="Year of Graduation"
                variant="outlined"
                name="grad_year"
                size="small"
                value={formData.grad_year ?? ""}
                onChange={handelFormChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Last Employer" variant="outlined" name="last_employer" size="small" value={formData.last_employer ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Position Held" variant="outlined" name="position_held" size="small" value={formData.position_held ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                label="Service Duration"
                variant="outlined"
                name="serv_duration_mon"
                size="small"
                value={formData.serv_duration_mon ?? ""}
                onChange={handelFormChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Application Status" variant="outlined" name="appli_status" size="small" value={formData.appli_status ?? ""} onChange={handelFormChange} fullWidth />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Eligibility(s)</InputLabel>
                <Select
                  name="eligibility"
                  multiple
                  value={formData.eligibility ?? []}
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
                    <MenuItem key={name} value={name}>
                      {name}
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
