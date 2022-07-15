import axios from "axios";
import { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {

  const [searchUser, setSearchUser] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    return axios
      .get(`/profile/${searchUser}`)
      .then((res)=> {
        // Redirect to the specified user's profile
        window.location.href =`/profile/${searchUser}`
      })
      .catch((err) => {
        console.log((err))
      })
  }

  return (
    <form className="search_bar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search for a user"
        className="search_input"
        onChange={(event) => setSearchUser(event.target.value)}>
      </input>

      <button type="submit" className="search_button" >
        <i class="fa-solid fa-magnifying-glass"></i>
        {/* <img src="https://cdn-icons-png.flaticon.com/512/61/61088.png" className="search_bar_image"/> */}
      </button>
    </form>
  );
}

export default SearchBar;