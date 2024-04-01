import React from "react";
import * as ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { MapContainer } from "react-leaflet";

ReactDOM.render(
  <QueryClientProvider client={new QueryClient()}>
    <React.StrictMode>
      <CssBaseline />
      <MapContainer
        center={[51.163375, 10.447683]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <App />
      </MapContainer>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById("root")!
);
