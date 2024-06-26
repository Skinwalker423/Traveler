import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import { PagNav } from "../components/PagNav";
import useAuth from "../hooks/useAuth";

export default function Homepage() {
  const { state } = useAuth();
  return (
    <main className={styles.homepage}>
      <PagNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every
          city you can think of. Never forget your wonderful
          experiences, and show your friends how you have
          wandered the world.
        </h2>
        <Link
          to={state.isAuthenticated ? "/app" : "/login"}
          className='cta'
        >
          Start trecking now
        </Link>
      </section>
    </main>
  );
}
