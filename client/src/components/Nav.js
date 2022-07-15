import { Link } from "react-router-dom";
import "./Nav.css";
import Login from "./Login";
import Logout from "./Logout";
import SearchBar from "./SearchBar";

const Nav = (props) => {
  let username = sessionStorage.getItem("user_name");
  return (
    <nav className="bopz-nav">
      <div className="logo">
        <Link className="nav-link" to="/">Bopz</Link>
      </div>
      <SearchBar />
      <ul>
        <Link className="nav-link" to="/about">About Us</Link>
        <Link className="nav-link" to={`/profile/${username}`}>Profile</Link>
        <Login setLoggedIn={props.setLoggedIn}/>
        {/* <Link className="nav-link" to="/login">Login</Link> */}
        <Logout />
      </ul>
    </nav>
  )

}

export default Nav