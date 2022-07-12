import logo from "./logo.svg";
import "./App.css";
import Shazam from "./components/Shazam";
import Nav from "./components/Nav";

import { Outlet, Link } from "react-router-dom";

import PostList from "./components/PostList";

function App() {
  return (
    <div className="App">
      <Nav />
      <Shazam />
      <Outlet />
    </div>
  );
}

export default App;
