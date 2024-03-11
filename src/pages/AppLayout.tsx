import style from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className={style.app}>
      <Sidebar />
    </div>
  );
}
