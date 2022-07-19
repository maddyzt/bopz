import { Link } from "react-router-dom";
import "./Nav.css";
import Login from "./Login";
import Logout from "./Logout";
import SearchBar from "./SearchBar";

const Nav = (props) => {
  let username = props.user?.name;

  return (
    <div className="nav-container">
    <nav className="bopz-nav">
      <div className="logo">
        <Link className="nav-link" to="/">BOPZ</Link>
      </div>

      <ul className="nav-area-left">
        <Link className="nav-link" to={`/profile/${username}`}>Profile</Link>
        <Link className="nav-link" to="/about">About Us</Link>
      </ul>

      <SearchBar />

      <ul className="nav-area-right">
        <Login
          setLoggedIn={props.setLoggedIn}
          loggedIn={props.loggedIn}
          setToken={props.setToken}
          token={props.token}
          user={props.user}
          setUser={props.setUser}
        />
        <Logout />
      </ul>

    </nav>
    </div>
  );
};

export default Nav