import SearchBar from "../searchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="nav-container">
      <nav>
        {pathname !== "/home" && (
          <Link to="/home" className="nav-link">
            Home
          </Link>
        )}

        {pathname !== "/create" && (
          <Link to="/create" className="nav-link">
            Create a game
          </Link>
        )}
        <Link to="/" className="nav-logout">
          Exit
        </Link>
        <SearchBar />
      </nav>
    </div>
  );
};

export default NavBar;
