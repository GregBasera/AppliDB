import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import Axios from "axios";
import { Depts } from "../../../endpoints";
import { headers } from "../../../storages";

export default function Export2JO(props) {
  const [deptsBook, setDeptsBook] = useState([]);
  const [dept, setDept] = useState("");
  const deptChange = (event) => {
    setDept(event.target.value);
  };
  const [isActive, setIsActive] = useState(false);
  const handleActiveChange = (event) => {
    setIsActive(event.target.value);
  };

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

  return (
    <Dialog open={props.open} onClose={() => props.setOpen()}>
      <DialogTitle>{"Transfer Applicant to JO Database"}</DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" size="small" fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>Department</InputLabel>
          <Select value={dept} onChange={deptChange} label="Department">
            {deptsBook.map((dept) => {
              return (
                <MenuItem key={dept.id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField type="date" variant="outlined" fullWidth size="small" label="Contract starts" InputLabelProps={{ shrink: true }} style={{ marginBottom: "10px" }} />
        <TextField type="date" variant="outlined" fullWidth size="small" label="Contract ends" InputLabelProps={{ shrink: true }} style={{ marginBottom: "10px" }} />
        <FormControl variant="outlined" size="small" fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>isActive</InputLabel>
          <Select value={isActive} onChange={handleActiveChange} label="isActive">
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
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
          defaultValue={JSON.stringify(props.rowData, null, 4)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.setOpen()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.setOpen()} color="primary" autoFocus>
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
}
