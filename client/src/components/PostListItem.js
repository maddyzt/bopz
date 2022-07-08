import "./PostListItem.css";

const PostListItem = (props) => {
  let songString = `${props.songName} by ${props.songArtist}`;
  
  return (
    <div className="post-box">
      {props.songName && props.songArtist && songString}
    </div>
  )

}

export default PostListItem