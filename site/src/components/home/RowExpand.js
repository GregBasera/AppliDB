import React from "react";
import { TableRow, TableCell, Card, CardContent, List, ListItem, ListSubheader, Grid, Paper, TextField } from "@material-ui/core";

export default function RowExpand(props) {
  let { date_applied, applying_for, referral, appli_status } = props.rowdata;
  const ad = { date_applied, applying_for, referral, appli_status };
  let { lname, fname, mname, sex, civil_status, birthdate, birthplace, curr_address, contact_num, email } = props.rowdata;
  const pi = { lname, fname, mname, sex, civil_status, birthdate, birthplace, curr_address, contact_num, email };
  let { nth_edu_attain, school, acad_track, grad_year, last_employer, position_held, serv_duration_mon } = props.rowdata;
  const ec = { nth_edu_attain, school, acad_track, grad_year, last_employer, position_held, serv_duration_mon };
  let { _id, createdAt, updatedAt } = props.rowdata;
  const md = { _id, createdAt, updatedAt };

  return (
    <TableRow style={{ backgroundColor: "#ADADAD" }}>
      <TableCell colSpan={props.colSpan}>
        <Card variant="outlined">
          {/* <CardContent>{JSON.stringify(props.rowdata)}</CardContent> */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Application Details</ListSubheader>}>
                  {Object.entries(ad).map((e) => (
                    <ListItem button key={e[0]}>
                      <TextField size="small" label={e[0]} variant="outlined" value={e[1]} fullWidth InputProps={{ readOnly: true }} />
                    </ListItem>
                  ))}
                </List>
                <List dense subheader={<ListSubheader component="div">Meta Data</ListSubheader>}>
                  {Object.entries(md).map((e) => (
                    <ListItem button key={e[0]}>
                      <TextField size="small" label={e[0]} variant="outlined" value={e[1]} fullWidth InputProps={{ readOnly: true }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Personal Information</ListSubheader>}>
                  {Object.entries(pi).map((e) => (
                    <ListItem button key={e[0]}>
                      <TextField size="small" label={e[0]} variant="outlined" value={e[1]} fullWidth InputProps={{ readOnly: true }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={4} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Education and Career</ListSubheader>}>
                  {Object.entries(ec).map((e) => (
                    <ListItem button key={e[0]}>
                      <TextField size="small" label={e[0]} variant="outlined" value={e[1]} fullWidth InputProps={{ readOnly: true }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TableCell>
    </TableRow>
  );
}
