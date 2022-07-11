import axios from "axios";
import "./PostListItem.css";

const PostListItem = (props) => {
  let songString = `${props.songName} by ${props.songArtist}`;

  return (
    <article className="post-box">
      <header className="post-header">
        <span className="post-user"><i id="smiley" className="fa-solid fa-face-grin-stars"></i> {props.username}</span>
      </header>
      <div className="post">
      {props.songName && props.songArtist && songString}
      </div>
      <footer className="post-footer">
      <span className="icons">
        <i className="fa-solid fa-heart heart"></i>
      </span>
      </footer>
    </article>
  )

}

export default PostListItem