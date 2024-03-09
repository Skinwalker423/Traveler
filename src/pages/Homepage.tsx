import { Link } from "react-router-dom";
import { PagNav } from "../components/PagNav";
import AppNav from "../components/AppNav";

const Homepage = () => {
  return (
    <div>
      <PagNav />
      <AppNav />
      <h1>Traveler</h1>
      <Link to={"/app"}>Go to App</Link>
    </div>
  );
};

export default Homepage;
