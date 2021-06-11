import React from "react";
import MUIDataTable from "mui-datatables";

export default function HomeJO() {
  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  const options = {
    elevation: 0,
  };

  return <MUIDataTable title={"Job Order Personel"} data={data} columns={columns} options={options} />;
}
