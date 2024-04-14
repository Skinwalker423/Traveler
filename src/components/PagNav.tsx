import { NavLink, useNavigate } from "react-router-dom";
import styles from "./PagNav.module.css";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import Button from "./Button";

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
  // {
  //   label: "Login",
  //   to: "/login",
  // },
];

export const PagNav = () => {
  const { state, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

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
      {state?.user ? (
        <Button type='button' onClick={handleLogOut}>
          Logout
        </Button>
      ) : (
        <NavLink to={"/login"} className={styles.ctaLink}>
          Login
        </NavLink>
      )}
    </nav>
  );
};
