import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Axios from "axios";
import moment from "moment";
import { JOs } from "../../../endpoints";
import { headers } from "../../../storages";

export default function HomeJO() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get(`${JOs}`, headers())
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
      name: "department",
      label: "department",
      options: {
        display: true,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value.name;
        },
      },
    },
    {
      name: "contract_start",
      label: "Contract Start",
      options: {
        display: true,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).format("MMM-DD-YYYY");
        },
      },
    },
    {
      name: "contract_ends",
      label: "Contract Ends",
      options: {
        display: true,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).format("MMM-DD-YYYY");
        },
      },
    },
    {
      name: "isActive",
      label: "isActive",
      options: {
        display: true,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return JSON.stringify(value);
        },
      },
    },
    {
      name: "_id",
      label: "Application Data",
      options: {
        display: true,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return JSON.stringify(value);
        },
      },
    },
  ];

  // const data = [];

  const options = {
    elevation: 0,
  };

  return <MUIDataTable title={"Job Order Personel"} data={data} columns={columns} options={options} />;
}
