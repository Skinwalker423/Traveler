import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"/app/cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"/app/countries"}>countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
