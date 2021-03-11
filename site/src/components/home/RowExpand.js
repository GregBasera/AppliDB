import React, { useState } from "react";
import Axios from "axios";
import {
  TableRow,
  TableCell,
  Card,
  CardContent,
  List,
  ListSubheader,
  Grid,
  Paper,
  Typography,
  Divider,
  CardActions,
  Button,
  FormControlLabel,
  Switch,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { Applicants } from "../../endpoints";
import Alert from "@material-ui/lab/Alert";
import ExpandedListItems from "./ExpandedListItems";
import DeleteIcon from "@material-ui/icons/Delete";

function accessPrivsDelete() {
  let auth = JSON.parse(sessionStorage.getItem("auth"));
  if (auth.user.role.name !== "Admin") {
    return <Alert severity="error">{`Your account only has '${auth.user.role.name}' privileges. You do not have access to this feature/action.`}</Alert>;
  } else {
    return null;
  }
}

function accessPrivsUpdate() {
  let auth = JSON.parse(sessionStorage.getItem("auth"));
  if (auth.user.role.name === "Staff") {
    return false;
  }
  return true;
}

export default function RowExpand(props) {
  const ad = ({ date_applied, applying_for, referral, appli_status }) => {
    return { date_applied, applying_for, referral, appli_status };
  };
  const md = ({ _id, createdAt, updatedAt }) => {
    return { _id, createdAt, updatedAt };
  };
  const pi = ({ lname, fname, mname, sex, civil_status, birthdate, age, birthplace, contact_num, email, resi_address, perm_address }) => {
    return { lname, fname, mname, sex, civil_status, birthdate, age, birthplace, contact_num, email, resi_address, perm_address };
  };
  const ec = ({ nth_edu_attain, school, acad_track, grad_year, achieve, last_employer, position_held, serv_duration_mon, eligibility }) => {
    return { nth_edu_attain, school, acad_track, grad_year, achieve, last_employer, position_held, serv_duration_mon, eligibility };
  };

  const [editMode, setEditMode] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const handleClose = () => {
    setDelModalOpen(false);
  };
  const delConfirmed = (id) => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));
    Axios.delete(`${Applicants}/${id}`, {
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
    <TableRow style={{ backgroundColor: "#9CA3AF" }}>
      <TableCell colSpan={props.colSpan}>
        <Card variant="outlined">
          <CardActions>
            <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={() => setDelModalOpen(true)}>
              Delete this Applicant
            </Button>
            {accessPrivsUpdate() ? <FormControlLabel control={<Switch checked={editMode} onChange={() => setEditMode(!editMode)} name="checkedA" />} label="Edit Mode" /> : null}
          </CardActions>

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Application Details</ListSubheader>}>
                  <ExpandedListItems obj={ad(props.rowdata)} editMode={editMode} appliID={props.rowdata._id} upd={props.upd} />
                </List>
                <Divider />
                <List dense subheader={<ListSubheader component="div">Meta Data</ListSubheader>}>
                  <ExpandedListItems obj={md(props.rowdata)} editMode={false} appliID={props.rowdata._id} />
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Personal Information</ListSubheader>}>
                  <ExpandedListItems obj={pi(props.rowdata)} editMode={editMode} appliID={props.rowdata._id} upd={props.upd} />
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Education and Career</ListSubheader>}>
                  <ExpandedListItems obj={ec(props.rowdata)} editMode={editMode} appliID={props.rowdata._id} upd={props.upd} />
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Dialog open={delModalOpen} onClose={handleClose}>
          <DialogTitle>{`DELETE applicant ${props.rowdata._id}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography color="textPrimary">{`You are about to DELETE applicant ${props.rowdata._id}.`}</Typography>
              <Typography color="textPrimary">{`Fullname: ${props.rowdata.lname}, ${props.rowdata.fname} ${props.rowdata.mname}`}</Typography>
              <Typography paragraph color="textPrimary">{`Application date: ${props.rowdata.date_applied} as ${props.rowdata.applying_for}`}</Typography>
              {accessPrivsDelete()}
              <Alert severity="error" style={{ margin: "5px" }}>
                THIS CAN NOT BE UNDONE!
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => delConfirmed(props.rowdata._id)} variant="contained" color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
