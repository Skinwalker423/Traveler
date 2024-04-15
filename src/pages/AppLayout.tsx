import style from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AppLayout() {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate("/");
    }
  }, [state.isAuthenticated]);

  return (
    <div className={style.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
