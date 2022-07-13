import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import "./PostListItem.css";
import $ from "jquery";

const PostListItem = (props) => {
  let songString = `${props.songName} by ${props.songArtist}`;
  const [likes, setLikes] = useState();
  const [liked, updateLiked] = useState(false);

  const post = {
    id: props.id,
    likes: likes
  };

  const dbLikes = () => {
    axios.post('http://localhost:8080/feed/likes', post)
    .then((response) => {
      console.log('dblikes', response);
      setLikes(response.data.rows[0].likes);
      console.log('after setting likes initially', likes)
    })
  }

  useEffect(() => {
    dbLikes();
  }, [])

  useEffect(() => {
    setLikes(likes => likes + (liked ? 1 : -1));
    console.log('likes after update', likes)
    console.log('posting again');
    axios.post('http://localhost:8080/feed/likes/update', post)
  }, [liked]);

  $(function(){
    $('.content').on("click", function(){
      $('.content').toggleClass("heart-active")
      $('.text').toggleClass("heart-active")
      $('.numb').toggleClass("heart-active")
      $('.heart').toggleClass("heart-active")
    });
  });

  return (
    <article className="post-box">
      <header className="post-header">
        <span className="post-user"><i id="smiley" className="fa-solid fa-face-grin-stars"></i> {props.username}</span>
      </header>
      <div className="post">
      {props.songName && props.songArtist && songString}
      </div>
      <footer className="post-footer">
      <span className="content" onClick={function clickLike(liked) {
        updateLiked(liked => !liked);
      }}>
      <span className="heart"></span>
      <span className="numb">{likes}</span>
      </span>
      </footer>
    </article>
  )

}

export default PostListItem