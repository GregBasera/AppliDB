import React from "react";
import { TableRow, TableCell, Card, CardContent, List, ListItem, ListSubheader, Grid, Paper, Typography, Divider } from "@material-ui/core";

function renderListItems(obj) {
  return Object.entries(obj).map((e) => (
    <ListItem button key={e[0]}>
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
  const pi = ({ lname, fname, mname, sex, civil_status, birthdate, birthplace, curr_address, contact_num, email }) => {
    return { lname, fname, mname, sex, civil_status, birthdate, birthplace, curr_address, contact_num, email };
  };
  const ec = ({ nth_edu_attain, school, acad_track, grad_year, last_employer, position_held, serv_duration_mon, eligibility }) => {
    return { nth_edu_attain, school, acad_track, grad_year, last_employer, position_held, serv_duration_mon, eligibility };
  };

  return (
    <TableRow style={{ backgroundColor: "#9CA3AF" }}>
      <TableCell colSpan={props.colSpan}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Application Details</ListSubheader>}>
                  {renderListItems(ad(props.rowdata))}
                </List>
                <Divider />
                <List dense subheader={<ListSubheader component="div">Meta Data</ListSubheader>}>
                  {renderListItems(md(props.rowdata))}
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Personal Information</ListSubheader>}>
                  {renderListItems(pi(props.rowdata))}
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Education and Career</ListSubheader>}>
                  {renderListItems(ec(props.rowdata))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TableCell>
    </TableRow>
  );
}
