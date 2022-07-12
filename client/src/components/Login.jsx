import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';


const Login = () => {

  // Looks for the query string (everything after '?' in URL)
  const code = new URLSearchParams(window.location.search).get("code");

  const [name, setName] = useState("");

  const userInfo = () => {
    let sessionToken = sessionStorage.getItem("access_token");

    return axios
      // Pass the session token as a param to /user route, allows for API queries
      .get("/user", { params: { token: sessionToken } })
      .then((res) => {
        console.log(res.data.body);
        setName(res.data.body.display_name);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (code) {
      axios.post("/login/callback", { code })
        .then((res) => {
          // Save the access_token in session storage (enables queries across routes)
          sessionStorage.setItem("access_token", res.data.access_token);

          // Hide the query string after successful login
          window.history.pushState({}, null, "/");
        })
        .then((res) => {
          userInfo();
        });
    }
  }, [code]);

  const change = () => {
    return axios
      .get("/login")
      .then((res) => {
        window.location.href = res.data;
        console.log("successful redirect!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>

      {/* // Checks if user is logged in (based on session storage), displays login message accordingly */}
      {!sessionStorage.getItem("access_token") && <button onClick={change}> Login to Spotify </button>}

      {sessionStorage.getItem("access_token") && <h5> Logged in as: {name} </h5>}

    </Fragment>
  );
}

export default Login;



