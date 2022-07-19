import Shazam from "./Shazam";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const HomePage = (props) => {

  return (
    <div className="App">
    <Nav
      setLoggedIn={props.setLoggedIn}
      loggedIn={props.loggedIn}
      setToken={props.setToken}
      token={props.token}
      user={props.user}
      setUser={props.setUser}
    />
    <Shazam user={props.user} setUser={props.setUser} loggedIn={props.loggedIn}/>
    <Outlet />
  </div>
  )

}

export default HomePage;