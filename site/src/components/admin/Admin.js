import React from "react";
import AppNavBar from "../AppNavBar";
import { Redirect } from "react-router-dom";
import PageBody from "./PageBody";
import Graph from "./statistics/Graph";
import { Container } from "@material-ui/core";

export default function Admin() {
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  if (auth.user.role.name !== "Admin") return <Redirect to="/auth" />;

  return (
    <div>
      <AppNavBar />

      <PageBody />

      <Container>
        <Graph
          // maxHeight="500px"
          type="pie"
          data={{
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
              {
                // label: ["dummy data", "dummy data", "dummy data"],
                data: [12, 19, 3],
                backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
              },
            ],
          }}
          options={null}
        />
      </Container>
    </div>
  );
}
