import "./App.css";
import Shazam from "./components/Shazam";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!user) {
      const access = sessionStorage.getItem("access");
      const refresh = sessionStorage.getItem("refresh");

      console.log(access, refresh);

      if (access && refresh) {
        console.log("Resetting User");
        setToken({ access, refresh });
        axios
          // Pass the session token as a param to /user route, allows for API fetch
          // Session token must be passed to each route, fetch will be rejected otherwise
          .post("/user", { sessionToken: access })
          .then((res) => {
            console.log(res.data.body);
            setUser({
              name: res.data.body.display_name,
              email: res.data.body.email,
            });
            setLoggedIn(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [user]);

  return (
    <div className="App">
      <Nav
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setToken={setToken}
        token={token}
        user={user}
        setUser={setUser}
      />
      <Shazam user={user} setUser={setUser} loggedIn={loggedIn}/>
      <Outlet />
    </div>
  );
}

export default App;
