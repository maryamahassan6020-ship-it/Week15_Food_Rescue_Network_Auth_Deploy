import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

// A plain controlled form. On submit it calls the store's login action, then
// sends you to the protected profile page.
function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  // The demo account is filled in so you can log in right away.
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const onSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate("/profile");
  };

  return (
    <main className="auth">
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Log in</h1>

        <label className="auth-field">
          Username
          <input className="auth-input" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="auth-field">
          Password
          <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" disabled={status === "loading"}>
          {status === "loading" ? "Logging in…" : "Log in"}
        </button>

        <p className="auth-hint">Demo account: emilys / emilyspass (filled in for you).</p>
        <p className="auth-hint">No account? <Link to="/signup">Sign up</Link></p>
      </form>
    </main>
  );
}

export default LoginPage;
