import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MessageInRecentBopz.css";
import Avatar from "./Avatar";
import moment from "moment";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Message(props) {

const { id } = useParams();


let songString = `${props.songName} by ${props.songArtist}`;

  // const [songData, setSongData] = useState({});

  // const getSongData = () => {
  //   axios.get("http://localhost:8080/profile/songs").then((response) => {
  //     console.log("response reached", response);
  //     setSongData({
  //       id: response.data.rows[0].id,
  //       song_name: response.data.rows[0].song_name,
  //       song_artist: response.data.rows[0].song_artist,
  //       album: response.data.rows[0].album,
  //       coverart: response.data.rows[0].cover_art,
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getSongData();
  // }, []);

 

  // const { user, createdOn, children } = props;


  return (
    <div>
      {/* <article className="post-box">
      <header className="post-header">
        <span className="post-user"><i id="smiley" className="fa-solid fa-face-grin-stars"></i> {props.username}</span>
      </header>
      <div className="post">
      {props.songName && props.songArtist && songString}
      </div>
      <footer className="post-footer">
        <div className="post-date">
        {props.date}
        </div>
        <div className="content">
          <span className="heart"></span>
          <span className="numb">{props.likes}</span>
        </div>
      </footer>
    </article> */}
    </div>
  );
}

// Message.propTypes = {
//   user: PropTypes.string,
//   createdOn: PropTypes.string,
// };
export default Message;


// <div className="tweet">
// <Avatar name={postData.coverArt} />
// <div>
//   <div className="tweet-header">
//     <span className="tweet-user">@{id}</span>·
//     <span className="tweet-created-on">
//       {postData.date}
//     </span>
//   </div>
//   <div className="tweet-content">
//     {id} just bopped {postData.song_name} from{" "}
//     {postData.song_artist}
//   </div>
// </div>
// </div>  