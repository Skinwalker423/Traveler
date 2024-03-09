import { Outlet } from "react-router-dom";

import style from "./AppLayout.module.css";
import AppNav from "../components/AppNav";

export default function AppLayout() {
  return (
    <div className={style.rootContainer}>
      <AppNav />

      <Outlet />
    </div>
  );
}
