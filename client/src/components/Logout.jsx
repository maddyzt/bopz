
const Logout = (props) => {

  const endSession = () => {
    sessionStorage.clear();
    window.location.href="/";
  }

  return (
    <button onClick={endSession}>
      Logout
    </button>
  )

}

export default Logout;