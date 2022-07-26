import "./App.css";
import HomePage from "./components/HomePage";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import RequireAuth from "./components/RequireAuth";


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
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ 
        <HomePage
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setToken={setToken}
        token={token}
        user={user}
        setUser={setUser}
        /> } 
      />
      <Route
        path="profile/:id"
        element={
          <RequireAuth>
            {" "}
            <Profile user={user}/>{" "}
          </RequireAuth>
        }
      />
      <Route
        path="about"
        element={
          // <RequireAuth>
 
            <About />
          // </RequireAuth>
        }
      />
      <Route path="loginpage" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
