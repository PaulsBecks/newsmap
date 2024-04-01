import React from "react";
import * as ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
ReactDOM.render(
  <QueryClientProvider client={new QueryClient()}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById("root")!
);
