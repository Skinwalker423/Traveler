import { NavLink } from "react-router-dom";
import styles from "./PagNav.module.css";
import Logo from "./Logo";

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
  {
    label: "Login",
    to: "/login",
  },
];

export const PagNav = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {LINKS.map(({ label, to }) => {
          const classStyles =
            label === "Login"
              ? styles.ctaLink
              : styles.link;
          return (
            <li key={label}>
              <NavLink className={classStyles} to={to}>
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
