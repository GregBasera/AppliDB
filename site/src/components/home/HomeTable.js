import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CircularProgress, Tooltip, IconButton, Typography } from "@material-ui/core";
import { Applicants } from "../../endpoints";
import { headers } from "../../storages";
import AddAppliBtn from "./AddAppliBtn";
import RowExpand from "./RowExpand";

export default function HomeTable() {
  const packetSize = 1000;
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [tableReady, setTableReady] = useState(false);

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(odd)": {
              backgroundColor: "#e1ecf2",
            },
          },
        },
      },
    });

  useEffect(() => {
    // get the number of records on the Database
    Axios.get(`${Applicants}/count`, headers())
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get the first portion from Database
    Axios.get(`${Applicants}?_start=${0}&_limit=${packetSize}&_sort=date_applied:DESC,lname:ASC`, headers())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data !== null && data.length !== packetSize) {
      if (data.length < count) {
        bgFetch();
        setTableReady(false);
      } else {
        setTableReady(true);
      }
    }
    return () => {};
    // eslint-disable-next-line
  }, [data]);

  const bgFetch = async () => {
    // console.log("fetch");
    let suple = await Axios.get(`${Applicants}?_start=${data.length}&_limit=${packetSize}&_sort=date_applied:DESC,lname:ASC`, headers());
    setData([...data, ...suple.data]);
  };

  const handleNewRecord = (newRecord) => {
    setData([newRecord, ...data]);
    setCount(count + 1);
  };

  const handleDelete = (id) => {
    let q = [...data];
    q.splice(q.map((e) => e._id).indexOf(id), 1);
    setData(q);
    setCount(count - 1);
  };

  const handleUpdate = (updated) => {
    let q = [...data];
    q.splice(q.map((e) => e._id).indexOf(updated.id), 1, updated);
    setData(q);
  };

  const columns = [
    {
      name: "_id",
      label: "#",
      options: {
        filter: false,
        customBodyRender: (rowIndex, dataIndex) => (
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            {dataIndex.rowIndex + 1}
          </Typography>
        ),
      },
    },
    {
      name: "_id",
      label: "Applicant ID",
      options: { filter: false, display: false },
    },
    {
      name: "date_applied",
      label: "Date Applied",
      options: {
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).format("MMM-DD-YYYY");
        },
      },
    },
    {
      name: "applying_for",
      label: "Applying for",
      options: { display: true },
    },
    {
      name: "lname",
      label: "Fullname (Last, First Middle)",
      options: {
        filter: false,
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return `${value}, ${tableMeta.rowData[5]} ${tableMeta.rowData[6]}`;
        },
      },
    },
    {
      name: "lname",
      label: "Lastname",
      options: { filter: false, display: false },
    },
    {
      name: "fname",
      label: "Firstname",
      options: { filter: false, display: false },
    },
    {
      name: "mname",
      label: "Middlename",
      options: { filter: false, display: false },
    },
    {
      name: "sex",
      label: "Sex",
      options: { display: true },
    },
    {
      name: "civil_status",
      label: "Civil Status",
      options: { display: true },
    },
    {
      name: "birthdate",
      label: "Birthdate",
      options: {
        filter: false,
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).format("MMM-DD-YYYY");
        },
      },
    },
    {
      name: "age",
      label: "Age",
      options: { display: true },
    },
    {
      name: "birthplace",
      label: "Birthplace",
      options: { display: true },
    },
    {
      name: "resi_address",
      label: "Residencial Address",
      options: { filter: false, display: false },
    },
    {
      name: "perm_address",
      label: "Permanent Address",
      options: { filter: false, display: false },
    },
    {
      name: "contact_num",
      label: "Contact Number",
      options: { filter: false, display: false },
    },
    {
      name: "email",
      label: "Email Address",
      options: { filter: false, display: false },
    },
    {
      name: "nth_edu_attain",
      label: "Highest Educational Attainment",
      options: { display: false },
    },
    {
      name: "school",
      label: "School Attended",
      options: { display: false },
    },
    {
      name: "acad_track",
      label: "Course / Strand",
      options: { display: false },
    },
    {
      name: "grad_year",
      label: "Year of Graduation",
      options: { filter: false, display: false },
    },
    {
      name: "achieve",
      label: "Achievements",
      options: { filter: false, display: false },
    },
    {
      name: "last_employer",
      label: "Last Employer",
      options: { filter: false, display: false },
    },
    {
      name: "position_held",
      label: "Position Held",
      options: { filter: false, display: false },
    },
    {
      name: "serv_duration_mon",
      label: "Duration of Service",
      options: { filter: false, display: false },
    },
    {
      name: "eligibility",
      label: "Eligibility(s)",
      options: { display: false },
    },
    {
      name: "appli_status",
      label: "Status of Application",
      options: { filter: false, display: false },
    },
    {
      name: "referral",
      label: "Where did you find us?",
      options: { display: false },
    },
    {
      name: "encoder",
      label: "Encoder",
      options: { display: false },
    },
  ];

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    setTableProps: () => {
      return { size: "small" };
    },
    expandableRows: true,
    draggableColumns: {
      enabled: true,
    },
    selectableRowsHideCheckboxes: true,
    // resizableColumns: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return <RowExpand colSpan={rowData.length + 1} rowdata={data[rowMeta.dataIndex]} del={handleDelete} upd={handleUpdate} />;
    },
    customToolbar: () => {
      // show circular progress when pulling records
      return tableReady ? (
        <AddAppliBtn add={handleNewRecord} />
      ) : (
        <Tooltip title={"Add an Applicant"}>
          <IconButton>
            <CircularProgress size={16} />
          </IconButton>
        </Tooltip>
      );
    },
    // Printing and Archiving
    downloadOptions: {
      filename: `ApplicantDatabase-${moment().format("DD-MMM-YYYY")}.csv`,
      separator: ",",
      filterOptions: { useDisplayedColumnsOnly: true, useDisplayedRowsOnly: true },
    },
    // count: data ? data.length : 0,
    rowsPerPage: 15,
    rowsPerPageOptions: [10, 15, 50, 100, count],
    onTableInit: (action, tableState) => {
      bgFetch();
    },
  };

  return data ? (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable title={"Applicant List"} data={data} columns={columns} options={options} />
    </MuiThemeProvider>
  ) : (
    <CircularProgress />
  );
}
