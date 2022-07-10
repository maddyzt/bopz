import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {

  return (
    <nav className="bopz-nav">
      <div className="logo">
      Bopz
      </div>
      <ul>
      <Link className="nav-link" to="/profile">Profile</Link>
      <Link className="nav-link" to="/about">About Us</Link>
      <Link className="nav-link" to="/">Home</Link>
      </ul>
    </nav>
  )

}

export default Nav