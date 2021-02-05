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
      name: "appliying_for",
      label: "Appliying for",
      options: { filter: true, sort: true },
    },
    {
      name: "date_applied",
      label: "Date Applied",
      options: { filter: true, sort: true },
    },
    {
      name: "lname",
      label: "Lastname",
      options: { filter: true, sort: true },
    },
    {
      name: "fname",
      label: "Firstname",
      options: { filter: true, sort: true },
    },
    {
      name: "mname",
      label: "Middlename",
      options: { filter: true, sort: true },
    },
    {
      name: "birthdate",
      label: "Birthdate",
      options: { filter: true, sort: true },
    },
    {
      name: "sex",
      label: "Sex",
      options: { filter: true, sort: true },
    },
    {
      name: "civil_status",
      label: "Civil Status",
      options: { filter: true, sort: true },
    },
  ];

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return <RowExpand colSpan={rowData.length + 1} rowdata={data[rowMeta.dataIndex]} />;
    },
    customToolbar: () => {
      return <AddAppliBtn />;
    },
  };

  return data ? <MUIDataTable title={"Applicant List"} data={data} columns={columns} options={options} /> : <CircularProgress />;
}
