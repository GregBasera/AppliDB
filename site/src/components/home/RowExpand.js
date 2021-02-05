import React from "react";
import { TableRow, TableCell, Card, CardContent, CardActions, Button } from "@material-ui/core";

export default function RowExpand(props) {
  return (
    <TableRow style={{ backgroundColor: "#eeeeee" }}>
      <TableCell colSpan={props.colSpan}>
        <Card variant="outlined">
          <CardContent>{JSON.stringify(props.rowdata)}</CardContent>

          <CardActions>
            <Button>button</Button>
          </CardActions>
        </Card>
      </TableCell>
    </TableRow>
  );
}
