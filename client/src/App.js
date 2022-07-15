import logo from "./logo.svg";
import "./App.css";
import Shazam from "./components/Shazam";
import Nav from "./components/Nav";
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import PostList from "./components/PostList";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  
  return (
    <div className="App">
      <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Shazam loggedIn={loggedIn}/>
      <Outlet />
    </div>
  );
}

export default App;
