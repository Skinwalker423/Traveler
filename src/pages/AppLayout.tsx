import style from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

export default function AppLayout() {
  return (
    <div className={style.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
