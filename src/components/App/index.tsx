import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

import Login from "../Login";

const Layout = styled(Box)({
  display: "grid",
  placeItems: "center",
  minHeight: "100vh",
  width: "100%",
});

export default function App(): JSX.Element {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}
