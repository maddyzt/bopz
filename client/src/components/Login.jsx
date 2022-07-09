import axios from 'axios';

const Login = () => {
  axios.get('/')
    .then((response) => {
      window.location = "https://accounts.spotify.com"
    })

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>About</h2>
    </main>
  );
}

export default Login;