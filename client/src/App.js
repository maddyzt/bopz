import logo from './logo.svg';
import './App.css';
import Shazam from './components/Shazam';

import { Outlet, Link } from "react-router-dom";

import PostList from './components/PostList';
// import './scripts/recordAudio';

function App() {

  return (
    <div>
      <nav>
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/about">About Us</Link> |{" "}
        <Link to="/">Home</Link>
      </nav>
      <Shazam />
      <Outlet />
    </div>
  );
}

export default App;

