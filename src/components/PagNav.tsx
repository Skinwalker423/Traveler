import { Link } from "react-router-dom";

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
    <nav>
      <ul>
        {LINKS.map(({ label, to }) => {
          return (
            <li key={label}>
              <Link to={to}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
