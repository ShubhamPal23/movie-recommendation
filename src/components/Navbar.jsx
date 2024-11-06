import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "e6a8a833176f610ddab69b3aec7b47c7";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleLog = () => {
    navigate("/login");
  };

  const handleSign = () => {
    navigate("/register");
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/search`, { state: { query } });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>MovieZone</h1>
      </div>
      <ul className="nav-links">
        <NavLink className="liinks" to="/">
          Home
        </NavLink>
        <NavLink className="liinks" to="/trending">
          Trending
        </NavLink>
        <NavLink className="liinks" to="/recommendation">
          Recommendation
        </NavLink>
        <NavLink className="liinks" to="/about">
          About Us
        </NavLink>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          onKeyDown={(e)=>{
            if(e.key==="Enter")
            {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="user-auth">
        {user ? (
          <div>
            <span style={{ color: "orange" }}>Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleLog} className="login-btn">
              Login
            </button>
            <button onClick={handleSign} className="signup-btn">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
