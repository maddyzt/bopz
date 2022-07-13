import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MessageInRecentBopz.css";
import Avatar from "./Avatar";
import moment from "moment";
import axios from "axios";

function Message(props) {
  const [songData, setSongData] = useState({});

  const getSongData = () => {
    axios.get("http://localhost:8080/profile/songs").then((response) => {
      console.log("response reached", response);
      setSongData({
        id: response.data.rows[0].id,
        song_name: response.data.rows[0].song_name,
        song_artist: response.data.rows[0].song_artist,
        album: response.data.rows[0].album,
        coverart: response.data.rows[0].cover_art,
      });
    });
  };

  useEffect(() => {
    getSongData();
  }, []);

  const [userData, setUserData] = useState({});

  const getUserData = () => {
    axios.get("http://localhost:8080/feed/user").then((response) => {
      console.log("response reached", response);
      setUserData({
        id: response.data.rows[0].id,
        username: response.data.rows[0].username,
      });
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const { user, createdOn, children } = props;
  return (
    <div className="tweet">
      <Avatar name={songData.cover_art} />
      <div>
        <div className="tweet-header">
          <span className="tweet-user">@{userData.username}</span>·
          <span className="tweet-created-on">
            {moment(createdOn).fromNow()}
          </span>
        </div>
        <div className="tweet-content">
          {userData.username} just bopped {songData.song_name} from{" "}
          {songData.song_artist} on album {songData.album}
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  user: PropTypes.string,
  createdOn: PropTypes.string,
};
export default Message;
