import { NavLink } from "react-router-dom";
import styles from "./PagNav.module.css";

const LINKS = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Product",
    to: "/products",
  },
  {
    label: "Pricing",
    to: "/pricing",
  },
];

export const PagNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        {LINKS.map(({ label, to }) => {
          return (
            <li key={label}>
              <NavLink className={styles.link} to={to}>
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
