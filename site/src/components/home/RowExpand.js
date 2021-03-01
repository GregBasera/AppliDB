import React, { useState } from "react";
import Axios from "axios";
import {
  TableRow,
  TableCell,
  Card,
  CardContent,
  List,
  ListItem,
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
import DeleteIcon from "@material-ui/icons/Delete";

function renderListItems(obj, editMode) {
  return Object.entries(obj).map((e) => (
    <ListItem button={editMode} key={e[0]}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Typography color="textSecondary">{e[0]}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{e[1]}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  ));
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
    Axios.delete(`${Applicants}/${id}`);
    handleClose();
  };

  return (
    <TableRow style={{ backgroundColor: "#9CA3AF" }}>
      <TableCell colSpan={props.colSpan}>
        <Card variant="outlined">
          <CardActions>
            <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={() => setDelModalOpen(true)}>
              Delete this Applicant
            </Button>
            <FormControlLabel control={<Switch checked={editMode} onChange={() => setEditMode(!editMode)} name="checkedA" />} label="Edit Mode" />
          </CardActions>

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Application Details</ListSubheader>}>
                  {renderListItems(ad(props.rowdata), editMode)}
                </List>
                <Divider />
                <List dense subheader={<ListSubheader component="div">Meta Data</ListSubheader>}>
                  {renderListItems(md(props.rowdata), editMode)}
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Personal Information</ListSubheader>}>
                  {renderListItems(pi(props.rowdata), editMode)}
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Education and Career</ListSubheader>}>
                  {renderListItems(ec(props.rowdata), editMode)}
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

              <Alert severity="warning" style={{ margin: "5px" }}>
                The GUI may not reflect the changes immediately. Reload the page if necessay.
              </Alert>
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
