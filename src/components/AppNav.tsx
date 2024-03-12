import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";
const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link to={"/app/cities"}>
          <li>Cities</li>
        </Link>
        <Link to={"/app/countries"}>
          <li>countries</li>
        </Link>
      </ul>
    </nav>
  );
};

export default AppNav;
