import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

// The navbar reads the auth store and reacts: logged out → a Log in link;
// logged in → Profile + a Log out button.
function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="site-nav">
      <Link to="/" className="site-nav-brand">🥕 Food Rescue Network</Link>

      <nav className="site-nav-links" aria-label="Primary">
        <Link to="/" className="nav-link">Home</Link>
        {token ? (
          <>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button type="button" className="nav-logout" onClick={logout}>Log out</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Log in</Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
