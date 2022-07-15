import { Link } from "react-router-dom";
import "./Nav.css";
import Login from "./Login";
import Logout from "./Logout";
import SearchBar from "./SearchBar";

const Nav = (props) => {
  let username = props.user?.name;
  return (
    <nav className="bopz-nav">
      <div className="logo">
        <Link className="nav-link" to="/">
          Bopz
        </Link>
      </div>
      <SearchBar />
      <ul>
        <Link className="nav-link" to="/about">
          About Us
        </Link>
        <Link className="nav-link" to={`/profile/${username}`}>
          Profile
        </Link>
        <Login
          setLoggedIn={props.setLoggedIn}
          loggedIn={props.loggedIn}
          setToken={props.setToken}
          token={props.token}
          user={props.user}
          setUser={props.setUser}
        />
        {/* <Link className="nav-link" to="/login">Login</Link> */}
        <Logout />
      </ul>
    </nav>
  );
};

export default Nav;
