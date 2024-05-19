import React from "react";
import * as ReactDOM from "react-dom";
import MapContainer from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.tsx";
import Articles from "./components/Articles.tsx";
import CreateArticle from "./components/CreateArticle.tsx";
import EditArticle from "./components/EditArticles.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Login />} path="login" />
      <Route element={<Articles />} path="articles" />
      <Route element={<EditArticle />} path="articles/:id" />
      <Route element={<CreateArticle />} path="articles/new" />
      <Route element={<MapContainer />} path="/" />
    </Route>
  ),
  {
    basename: "/newsmap",
  }
);

ReactDOM.render(
  <QueryClientProvider client={new QueryClient()}>
    <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById("root")!
);
