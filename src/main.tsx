import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Pricing from "./pages/Pricing";

import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "products",
    element: <ProductPage />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "app",
    element: <AppLayout />,
  },
]);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
