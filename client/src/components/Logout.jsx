
import "./Nav.css";
const Logout = (props) => {

  const endSession = () => {
    sessionStorage.clear();
    window.location.href="/loginpage";
  }

  return (
    <button onClick={endSession} className="log-button">
      Logout
    </button>
  )

}

export default Logout;