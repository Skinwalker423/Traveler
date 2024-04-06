import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Pricing from "./pages/Pricing";

import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { LocationProvider } from "./context/LocationContext";
import City from "./components/City";

const router = createBrowserRouter([
  {
    index: true,
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "products",
    element: <Product />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "app",
    element: <AppLayout />,

    children: [
      {
        index: true,
        element: <Navigate to={"cities"} replace />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:cityId",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
      {
        index: true,
        element: <CityList />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  </React.StrictMode>
);
