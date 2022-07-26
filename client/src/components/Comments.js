import axios from "axios";
import "./Comments.css";
import "./PostListItem.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// comments are hardcoded for now, new comment inactive
const Comments = () => {
  const [comments, setComments] = useState({});
  const { id } = useParams();
  const user = {
    friendUsername: id
  }
  let comment1 = "";
  let comment2 = "";
  let comment3 = "";
  let commentUser1 = "";
  let commentUser2 = "";
  let commentUser3 = "";
  let initial1 = "";
  let initial2 = "";
  let initial3 = "";

  const getComments = () => {
    axios.post('http://localhost:8080/profile/comments', user)
    .then(response => {
      console.log('getcomments', response);
      setComments({
        comment1: response.data.rows[0].comment,        
        comment2: response.data.rows[1].comment,        
        comment3: response.data.rows[2].comment,  
        date1: response.data.rows[0].date,      
        date2: response.data.rows[1].date,      
        date3: response.data.rows[2].date,      
        commentUser1: response.data.rows[0].username,
        commentUser2: response.data.rows[1].username,
        commentUser3: response.data.rows[2].username,
      })

      console.log('comment1', comment1, commentUser1)
    })
  }

  useEffect(() => {
    getComments();
  }, []);
  
  
  return (
    <div className="comment-container">
      <h2>
      Comments
      </h2>
      <article className="comment-box">
      <header className="comment-header">
        <span className="comment-user"><div className="avatar">E</div> {comments.commentUser1}</span>
        <div className="comment-date">
        {comments.date1}
        </div>
      </header>
      <div className="comment-text">
        {comments.comment1}
      </div>
      </article>

      <article className="comment-box">
      <header className="comment-header">
        <span className="comment-user"><div className="avatar">H</div> {comments.commentUser2}</span>
        <div className="comment-date">
        {comments.date2}
        </div>
      </header>
      <div className="comment-text">
        {comments.comment2}
      </div>
      </article>

      <article className="comment-box">
      <header className="comment-header">
        <span className="comment-user"><div className="avatar">P</div> {comments.commentUser3}</span>
        <div className="comment-date">
        {comments.date3}
        </div>
      </header>
      <div className="comment-text">
        {comments.comment3}
      </div>
      </article>

      <div className="new-comment-container">
      <input type="text" placeholder="Type something here..."/> 
      <button type="submit">+</button>
      </div>
    </div>
  )
}

export default Comments;

