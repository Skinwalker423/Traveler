import { Outlet } from "react-router-dom";
import { PagNav } from "../components/PagNav";

export default function RootLayout() {
  return (
    <>
      <div id='sidebar'>
        <header>
          <h1>Traveler</h1>
          <PagNav />
        </header>
        <Outlet />
      </div>
    </>
  );
}
