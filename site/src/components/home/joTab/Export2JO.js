import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
import { Depts } from "../../../endpoints";
import { headers } from "../../../storages";

export default function Export2JO(props) {
  const [deptsBook, setDeptsBook] = useState([]);
  useEffect(() => {
    Axios.get(`${Depts}`, headers())
      .then((res) => {
        setDeptsBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
    // eslint-disable-next-line
  }, []);

  const [dept, setDept] = useState("");
  const deptChange = (event) => {
    setDept(event.target.value);
  };
  const [contStart, setContStart] = useState("");
  const handleContStartChange = (event) => {
    setContStart(event.target.value);
  };
  const [contEnd, setContEnd] = useState("");
  const handleContEndChange = (event) => {
    setContEnd(event.target.value);
  };
  const [isActive, setIsActive] = useState(false);
  const handleActiveChange = (event) => {
    setIsActive(event.target.value);
  };

  const handleExport = () => {
    // consolidate and post with axios to jo personel
    console.log(dept, contStart, contEnd, isActive, props.rowData);
  };

  return (
    <Dialog open={props.open} onClose={() => props.setOpen()}>
      <DialogTitle>{"Transfer Applicant to JO Database"}</DialogTitle>

      <DialogContent>
        <Alert severity="warning" style={{ marginBottom: "10px" }}>
          This Applicant will be exported to the "JO Personel" database. His/Her record will remain in the "Applicants" database for record keeping, you can delete it if nessesary.
        </Alert>

        <FormControl variant="outlined" size="small" fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>Department</InputLabel>
          <Select value={dept} onChange={deptChange} label="Department">
            {deptsBook.map((dept) => {
              return (
                <MenuItem key={dept._id} value={dept._id}>
                  {dept.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          type="date"
          variant="outlined"
          value={contStart}
          onChange={handleContStartChange}
          fullWidth
          size="small"
          label="Contract starts"
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          type="date"
          variant="outlined"
          value={contEnd}
          onChange={handleContEndChange}
          fullWidth
          size="small"
          label="Contract ends"
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: "10px" }}
        />
        <FormControl variant="outlined" size="small" fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>isActive</InputLabel>
          <Select value={isActive} onChange={handleActiveChange} label="isActive">
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          size="small"
          label="Application Data"
          InputLabelProps={{ shrink: true }}
          value={JSON.stringify(props.rowData, null, 4)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.setOpen()} color="primary">
          Cancel
        </Button>
        <Button onClick={handleExport} color="primary" autoFocus>
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
}
