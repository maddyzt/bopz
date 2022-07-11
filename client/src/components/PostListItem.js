import { useState } from 'react';
import axios from "axios";
import "./PostListItem.css";

const PostListItem = (props) => {
  let songString = `${props.songName} by ${props.songArtist}`;
  const [likes, setLikes] = useState(0);

  const addLike = () => {
    setLikes(likes + 1);
    axios.post('http://localhost:8080/feed/likes', likes)
  };

   
  return (
    <article className="post-box">
      <header className="post-header">
        <span className="post-user"><i id="smiley" className="fa-solid fa-face-grin-stars"></i> {props.username}</span>
      </header>
      <div className="post">
      {props.songName && props.songArtist && songString}
      </div>
      <footer className="post-footer">
        <button className="heart-btn" onClick={addLike}>❤️ Likes: {likes}</button>
      </footer>
    </article>
  )

}

export default PostListItem