import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

// A protected page. You only get here with a token (see PrivateRoute). The user
// came from a protected request — we sent the token in the Authorization header.
function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="auth">
        <div className="auth-card">Loading your profile…</div>
      </main>
    );
  }

  return (
    <main className="auth">
      <div className="auth-card">
        <h1>Welcome, {user.firstName || user.username} 👋</h1>
        <p>You're logged in as <strong>{user.username}</strong> ({user.email}).</p>

        <p className="auth-hint">Your token (saved in localStorage):</p>
        <code className="auth-token">{token.slice(0, 40)}…</code>

        <p className="auth-hint">
          This profile came from a protected request — the server only sent it back because we
          included the token.
        </p>

        <button className="auth-button" onClick={handleLogout}>Log out</button>
      </div>
    </main>
  );
}

export default ProfilePage;
