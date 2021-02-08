import React from "react";
import { TableRow, TableCell, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, ListSubheader, Grid, Paper } from "@material-ui/core";

export default function RowExpand(props) {
  return (
    <TableRow style={{ backgroundColor: "#ADADAD" }}>
      <TableCell colSpan={props.colSpan}>
        <Card variant="outlined">
          {/* <CardContent>{JSON.stringify(props.rowdata)}</CardContent> */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Application Details</ListSubheader>}>
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={3} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Personal Information</ListSubheader>}>
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={3} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Education and Career</ListSubheader>}>
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={3} component={Paper} variant="outlined">
                <List dense subheader={<ListSubheader component="div">Meta Data</ListSubheader>}>
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <Button>button</Button>
          </CardActions>
        </Card>
      </TableCell>
    </TableRow>
  );
}
