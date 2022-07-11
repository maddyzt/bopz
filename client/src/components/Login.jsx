import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';


const Login = () => {

  // Looks for the query string (everything after '?' in URL)
  const code = new URLSearchParams(window.location.search).get("code");
  //console.log(code)

  return (
    <div>

      {/* // Checks if user is logged in (based on query string), displays login message accordingly */}
      {!code && <a href='http://localhost:8080/login'> Login to Spotify </a>}

      {code && <h5> Logged in </h5>}

      {/* Hides the query string after successful login */}
      {code && window.history.pushState({}, null, "/")}

    </div>
  );
}

export default Login;