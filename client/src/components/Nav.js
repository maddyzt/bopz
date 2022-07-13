import { Link } from "react-router-dom";
import "./Nav.css";
import Login from "./Login";
import Logout from "./Logout";

const Nav = () => {

  return (
    <nav className="bopz-nav">
      <div className="logo">
        <Link className="nav-link" to="/">Bopz</Link>
      </div>
      <ul>
        <Link className="nav-link" to="/about">About Us</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Login />
        {/* <Link className="nav-link" to="/login">Login</Link> */}
        <Logout />
      </ul>
    </nav>
  )

}

export default Nav