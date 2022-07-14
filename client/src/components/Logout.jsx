
const Logout = (props) => {

  const endSession = () => {
    sessionStorage.clear();
    window.location.href="/loginpage";
  }

  return (
    <button onClick={endSession}>
      Logout
    </button>
  )

}

export default Logout;