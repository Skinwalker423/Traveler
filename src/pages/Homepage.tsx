import { Link } from "react-router-dom";
import { PagNav } from "../components/PagNav";

const Homepage = () => {
  return (
    <div>
      <PagNav />
      <h1>Traveler</h1>
      <Link to={"/app"}>Go to App</Link>
    </div>
  );
};

export default Homepage;
