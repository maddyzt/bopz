import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';


const Login = (props) => {

  // Look for the query string (everything after '?' in URL)
  const code = new URLSearchParams(window.location.search).get("code");


  const userInfo = () => {
    let sessionToken = sessionStorage.getItem("access_token");

    return axios
      // Pass the session token as a param to /user route, allows for API fetch
      // Session token must be passed to each route, fetch will be rejected otherwise
      .get("/user", { params: { token: sessionToken } })
      .then((res) => {
        console.log(res.data.body);
        // Save user's name to session storage
        sessionStorage.setItem("user_name", res.data.body.display_name);
        // Save user's email to session storage
        sessionStorage.setItem("user_email", res.data.body.email);
        props.setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const saveUser = () => {

    return axios
      // Params sent as third argument (convention)
      .post("/save_user", {}, { params: { email: sessionStorage.getItem("user_email"), username: sessionStorage.getItem("user_name") } })
      .then((res) => {
        console.log("User email successfully updated in database");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {

    if (code) {
      axios.post("/login/callback", { code })
        .then((res) => {
          // Save the access_token in session storage (enables fetch across routes)
          sessionStorage.setItem("access_token", res.data.access_token);

          // Hide the query string after successful login
          window.history.pushState({}, null, "/");
          userInfo();
        })

    }

    if (props.loggedIn) {
      saveUser();
    }

  }, [code, props.loggedIn]);

  const change = () => {
    return axios
      .get("/login")
      .then((res) => {
        // window.open(res.data, 'test')
        window.location.href = res.data;
        console.log("successful redirect!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>

      {/* // Check if user is logged in (based on session storage), displays login message accordingly */}
      {(!sessionStorage.getItem("access_token" || !props.loggedIn)) &&
      <button className="log-button"onClick={change}> Login with Spotify </button>}

      {(sessionStorage.getItem("access_token" || props.loggedIn)) &&
      <span className="log-button"> Logged in as: <p className="username">{sessionStorage.getItem("user_name")}</p> </span>}

    </Fragment>
  );
}

export default Login;



// location.reload to refresh the page (use after logout --> delete the session storage)