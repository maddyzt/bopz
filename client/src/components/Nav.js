import { Link } from "react-router-dom";
import "./Nav.css";
import Login from "./Login";
import Logout from "./Logout";
import SearchBar from "./SearchBar";

const Nav = () => {
  let username = sessionStorage.getItem("user_name");
  return (
    <nav className="bopz-nav">
      <div className="logo">
        <Link className="nav-link" to="/">BOPZ</Link>
      </div>

      <ul className="nav-area">
        <Link className="nav-link" to={`/profile/${username}`}>Profile</Link>
        <Link className="nav-link" to="/about">About Us</Link>
      </ul>

      <SearchBar />

      <ul>
        <Login />
        <Logout />
      </ul>

    </nav>
  )

}

export default Nav