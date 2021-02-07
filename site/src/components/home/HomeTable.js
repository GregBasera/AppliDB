import React, { useState, useEffect } from "react";
import Axios from "axios";
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
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: "date_applied",
      label: "Date Applied",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "applying_for",
      label: "Applying for",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "lname",
      label: "Lastname",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "fname",
      label: "Firstname",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "mname",
      label: "Middlename",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "sex",
      label: "Sex",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "civil_status",
      label: "Civil Status",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "birthdate",
      label: "Birthdate",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "birthplace",
      label: "Birthplace",
      options: { filter: true, sort: true, display: true },
    },
    {
      name: "curr_address",
      label: "Current Address",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "contact_num",
      label: "Contact Number",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "email",
      label: "Email Address",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "nth_edu_attain",
      label: "Highest Educational Attainment",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "school",
      label: "School Attended",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "acad_track",
      label: "Course / Strand",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "grad_year",
      label: "Year of Graduation",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "last_employer",
      label: "Last Employer",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "position_held",
      label: "Position Held",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "serv_duration_mon",
      label: "Duration of Service",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "appli_status",
      label: "Status of Application",
      options: { filter: true, sort: true, display: false },
    },
    {
      name: "referral",
      label: "Where did you find us",
      options: { filter: true, sort: true, display: false },
    },
  ];

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    expandableRows: true,
    draggableColumns: {
      enabled: true,
    },
    // resizableColumns: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return <RowExpand colSpan={rowData.length + 1} rowdata={data[rowMeta.dataIndex]} />;
    },
    customToolbar: () => {
      return <AddAppliBtn />;
    },
  };

  return data ? <MUIDataTable title={"Applicant List"} data={data} columns={columns} options={options} /> : <CircularProgress />;
}
