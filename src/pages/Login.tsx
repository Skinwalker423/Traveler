import { FormEvent, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { PagNav } from "../components/PagNav";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { state, logIn } = useAuth();
  const navigate = useNavigate();

  console.log("user", state.isAuthenticated);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/app");
    }
  }, [state.isAuthenticated]);

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
            disabled={state.isLoading}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={state.isLoading}
          />
        </div>
        {state.error && (
          <p className={styles.error}>{state.error}</p>
        )}

        <div>
          <Button disabled={state.isLoading} type='submit'>
            {state.isLoading
              ? "Authenticating..."
              : "Login"}
          </Button>
        </div>
      </form>
    </main>
  );
}
