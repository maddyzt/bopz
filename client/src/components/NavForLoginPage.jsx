import { Link } from "react-router-dom";
import "./Nav.css";
import Login from "./Login";
import Logout from "./Logout";

const NavForLoginPage = () => {
  return (
    <nav className="bopz-nav-login">
      <div className="logo">
        <Link className="nav-link" to="/">
          Bopz
        </Link>
      </div>
      <ul>
        <Link className="nav-link-about" to="/about">
          About Us
        </Link>
      </ul>
    </nav>
  );
};

export default NavForLoginPage;
