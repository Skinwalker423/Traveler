import { Outlet } from "react-router-dom";
import { PagNav } from "../components/PagNav";
import style from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <>
      <div className={style.rootContainer}>
        <header className={style.header}>
          <h1>Traveler</h1>
          <PagNav />
        </header>
      </div>
      <Outlet />
    </>
  );
}
