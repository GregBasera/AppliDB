import React, { useEffect, useState } from "react";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { CircularProgress, Container } from "@material-ui/core";
import DeleteDialog from "./DeleteDialog";
import { Users } from "../../endpoints";
import UpdateDialog from "./UpdateDialog";

export default function PageBody() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));
    Axios.get(Users, {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // effect
    return () => {}; // cleanup
  }, []);

  const columns = [
    {
      name: "_id",
      label: "User ID",
      options: { filter: false, sort: false },
    },
    {
      name: "username",
      label: "Username",
      options: { filter: false },
    },
    {
      name: "email",
      label: "Email",
      options: { filter: false },
    },
    {
      name: "_id",
      label: "Role",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return `${users[tableMeta.rowIndex].role.name}`;
        },
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              {/* <Button variant="outlined">Update Role</Button> */}
              <UpdateDialog id={value} currRole={users[tableMeta.rowIndex].role._id} roleName={users[tableMeta.rowIndex].role.name} />
              <DeleteDialog id={value} />
            </React.Fragment>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 1,
    selectableRowsHideCheckboxes: true,
    print: false,
  };

  return users ? (
    <Container style={{ marginTop: "20px" }}>
      <MUIDataTable title={"Database Users"} data={users} columns={columns} options={options} />
    </Container>
  ) : (
    <CircularProgress />
  );
}
