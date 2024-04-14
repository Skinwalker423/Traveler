import { FormEvent, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { PagNav } from "../components/PagNav";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { state, logIn } = useAuth();
  const navigate = useNavigate();

  console.log("user", state.user);

  useEffect(() => {
    if (state.user) {
      navigate("/app");
    }
  }, [state.user]);

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!email || !password) return;
    await logIn(email, password);
  };

  return (
    <main className={styles.login}>
      <PagNav />
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {state.error && <p>{state.error}</p>}

        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
