import React from "react";
import AppNavBar from "../AppNavBar";
import { Redirect } from "react-router-dom";
import PageBody from "./PageBody";

export default function Admin() {
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  if (auth.user.role.name !== "Admin") return <Redirect to="/auth" />;

  return (
    <div>
      <AppNavBar />

      <PageBody />
    </div>
  );
}
