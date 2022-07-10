import "./PostListItem.css";

const PostListItem = (props) => {
  let songString = `${props.songName} by ${props.songArtist}`;
  
  return (
    <article className="post-box">
      <header className="post-header">
        <span className="post-user"><i id="smiley" class="fa-solid fa-face-grin-stars"></i> Maddy</span>
      </header>
      <div className="post">
      {props.songName && props.songArtist && songString}
      </div>
      <footer className="post-footer">
      <span class="icons">
        <i class="fa-solid fa-heart heart"></i>
      </span>
      </footer>
    </article>
  )

}

export default PostListItem