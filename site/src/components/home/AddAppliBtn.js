import React, { useState } from "react";
import Axios from "axios";
import moment from "moment";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Checkbox,
  ListItemText,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { FormControl, InputLabel, Select, MenuItem, Input, Chip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Applicants } from "../../endpoints";

const eligibilities = [
  "Civil Service Professional",
  "Civil Service Sub-Professional",
  "RA 1080 (Bar/Board Eligibility)",
  "Brgy. Official Eligibility",
  "Local Treasury Office Examination",
  "PD 907 (Honor Grad Eligibility)",
  "MC 11, S. 96",
  "Tesda NC I",
  "Tesda NC II",
  "Tesda NC III",
  "Tesda NC IV",
  "Others",
];
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

function plainTextField(type, label, name, value, onChange, InputLabelProps, helpertext) {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputLabelProps={InputLabelProps}
      helperText={
        helpertext ? (
          <FormHelperText component="small" margin="dense">
            {helpertext}
          </FormHelperText>
        ) : null
      }
    />
  );
}

function accessPrivs() {
  let auth = JSON.parse(sessionStorage.getItem("auth"));
  if (auth.user.role.name === "Visitor") {
    return <Alert severity="error">Your account only has 'Visitor' privileges. You will be unable to Add an Applicant.</Alert>;
  } else {
    return null;
  }
}

function creationFeedback(creation) {
  switch (creation.status) {
    case "pending":
      return <CircularProgress />;
    case "error":
      let q = JSON.parse(creation.msg).data;
      return <Alert severity={creation.level}>{q.message}</Alert>;
    case "success":
      return <Alert severity={creation.level}>this is success</Alert>;
    default:
      return null;
  }
}

export default function AddAppliBtn(props) {
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
      case "birthdate":
        setFormData({ ...formData, [e.target.name]: e.target.value, age: moment().diff(e.target.value, "years") });
        break;
      default:
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;
    }
  };

  const [creation, setCreation] = useState({ status: "hide", msg: {}, level: "error" });
  const handleAddAppli = () => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));

    Axios.post(Applicants, formData, {
      headers: {
        Authorization: "Bearer " + auth.jwt,
      },
    })
      .then((res) => {
        props.add(res.data);
        setCreation({ status: "success", msg: "Applicant record was added.", level: "success" });
        handleClose();
      })
      .catch((err) => {
        setCreation({ status: "error", msg: JSON.stringify(err.response), level: "error" });
      });
    // console.log(formData);
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
        {accessPrivs()}

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
            <Grid item xs={2}>
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
            <Grid item xs={1}>
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
            <Grid item xs={1}>
              {plainTextField("number", "Age", "age", formData.age ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={4}>
              {plainTextField("text", "Birthplace", "birthplace", formData.birthplace ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={2}>
              {plainTextField("text", "Contact Number", "contact_num", formData.contact_num ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("email", "Email address", "email", formData.email ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={6}>
              {plainTextField("text", "Residencial Address", "resi_address", formData.resi_address ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={6}>
              {plainTextField("text", "Permanent Address", "perm_address", formData.perm_address ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Highest Educational Attainment</InputLabel>
                <Select name="nth_edu_attain" value={formData.nth_edu_attain ?? ""} onChange={handelFormChange} label="Highest Educational Attainment">
                  {edu_attain.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {plainTextField("text", "School Attended", "school", formData.school ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={3}>
              {plainTextField("text", "Course / Track", "acad_track", formData.acad_track ?? "", handelFormChange)}
            </Grid>
            <Grid item xs={2}>
              {plainTextField("number", "Grad Year", "grad_year", formData.grad_year ?? "", handelFormChange)}
            </Grid>

            <Grid item xs={12}>
              {plainTextField("text", "Achievements/Honors/Scholarships", "achieve", formData.achieve ?? "", handelFormChange)}
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
            <Grid item xs={4}>
              <FormControl variant="outlined" size="small" fullWidth>
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

            <Grid item xs={12}>
              {plainTextField("text", "Application Status / Remarks", "appli_status", formData.appli_status ?? "", handelFormChange)}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          {creationFeedback(creation)}

          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleAddAppli} color="primary">
            Add Applicant
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
