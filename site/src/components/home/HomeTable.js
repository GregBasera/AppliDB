import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { CircularProgress } from "@material-ui/core";
import { Applicants } from "../../endpoints";
import AddAppliBtn from "./AddAppliBtn";
import RowExpand from "./RowExpand";

export default function HomeTable() {
  const [data, setData] = useState(null);
  const auth = JSON.parse(sessionStorage.getItem("auth"));

  useEffect(() => {
    Axios.get(Applicants, {
      headers: {
        Authorization: "Bearer " + auth.jwt,
      },
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
    // eslint-disable-next-line
  }, []);

  const handleNewRecord = (newRecord) => {
    setData([newRecord, ...data]);
  };

  const columns = [
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
          return moment(value).format("MMMM DD, YYYY");
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
      label: "Lastname",
      options: { filter: false, display: true },
    },
    {
      name: "fname",
      label: "Firstname",
      options: { filter: false, display: true },
    },
    {
      name: "mname",
      label: "Middlename",
      options: { filter: false, display: true },
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
          return moment(value).format("MMMM DD, YYYY");
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
      name: "appli_status",
      label: "Status of Application",
      options: { filter: false, display: false },
    },
    {
      name: "referral",
      label: "Where did you find us?",
      options: { display: false },
    },
  ];

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    expandableRows: true,
    draggableColumns: {
      enabled: true,
    },
    selectableRowsHideCheckboxes: false,
    // resizableColumns: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return <RowExpand colSpan={rowData.length + 1} rowdata={data[rowMeta.dataIndex]} />;
    },
    customToolbar: () => {
      return <AddAppliBtn add={handleNewRecord} />;
    },
    downloadOptions: {
      filename: `ApplicantDatabase-${moment().format("DD-MMM-YYYY")}`,
      separator: ",",
      filterOptions: { useDisplayedColumnsOnly: true, useDisplayedRowsOnly: true },
    },
    rowsPerPageOptions: [10, 50, 100, 1000],
  };

  return data ? <MUIDataTable title={"Applicant List"} data={data} columns={columns} options={options} /> : <CircularProgress />;
}
