import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';


const Login = () => {

  // Looks for the query string (everything after '?' in URL)
  const code = new URLSearchParams(window.location.search).get("code");
  //console.log(code)

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (code) {
      axios.post("/login/callback", { code })
        .then((res) => {
          console.log('Access token:', res.data.access_token);

          // Save the access_token in session storage (enables queries across routes)
          sessionStorage.setItem("access_token", res.data.access_token);

          // Set state to the current token
          setToken(res.data.access_token);

          // Hide the query string after successful login
          window.history.pushState({}, null, "/");
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

  const userInfo = () => {
    let sessionToken = sessionStorage.getItem("access_token");
     console.log('This is the session token', sessionToken)

    return axios
      // Pass the session token as a param to /user route, allows for API queries
      .get("/user", { params: { token: sessionToken } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <Fragment>

      {/* // Checks if user is logged in (based on session storage), displays login message accordingly */}
      {!sessionStorage.getItem("access_token") && <button onClick={change}> Login to Spotify </button>}

      {/* Testing userInfo route */}
     {sessionStorage.getItem("access_token") && <button onClick={userInfo}>user info</button>}

      {sessionStorage.getItem("access_token") && <h5> Logged in as: </h5>}

    </Fragment>
  );
}

export default Login;