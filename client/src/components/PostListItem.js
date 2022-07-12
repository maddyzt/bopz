import { useState } from 'react';
import axios from "axios";
import "./PostListItem.css";
import $ from "jquery";

const PostListItem = (props) => {
  let songString = `${props.songName} by ${props.songArtist}`;
  const [likes, setLikes] = useState(0);

  const post = {
    songName: props.songName,
    songArtist: props.songArtist,
    username: props.username
  };

  const addLike = () => {
    setLikes(likes + 1);
    axios.post('http://localhost:8080/feed/likes/add', likes)
  };

  const dbLikes = () => {
    axios.post('http://localhost:8080/feed/likes', post)
    .then((response) => {
      console.log('dblikes', response);
      setLikes(response.data.rows[0].likes);
    })
  }

  dbLikes();
  // const record = document.querySelector(".listen");
  $(document).ready(function(){
    $('.content').on("click", function(){
      $('.content').toggleClass("heart-active")
      $('.text').toggleClass("heart-active")
      $('.numb').toggleClass("heart-active")
      $('.heart').toggleClass("heart-active")
    });
  });

  // document.addEventListener("DOMContentLoaded", function(event) { 
  //   document.querySelector('.content').click(function(){
  //     document.querySelector('.content').classList.toggle("heart-active")
  //     document.querySelector('.numb').classList.toggle("heart-active")
  //     document.querySelector('.heart').classList.toggle("heart-active")
  //   });
  // });

  return (
    <article className="post-box">
      <header className="post-header">
        <span className="post-user"><i id="smiley" className="fa-solid fa-face-grin-stars"></i> {props.username}</span>
      </header>
      <div className="post">
      {props.songName && props.songArtist && songString}
      </div>
      <footer className="post-footer">
      <span className="content" onClick={addLike}>
          <span className="heart"></span>
          <span className="numb">{likes}</span>
      </span>
      </footer>
    </article>
  )

}

export default PostListItem