import { React, Fragment } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import UserProfile from './UserProfile';
import Nav from './Nav';
import ProfilePostList from './ProfilePostList';
import Comments from './Comments';
import "./Profile.css";

const Profile = (props) => {
  const [existingPosts, setExistingPosts] = useState([]);
  const [likesData, setLikesData] = useState({});
  const { id } = useParams();
  const profileUser = id;

  const user = {
    username: id
  }

  useEffect(() => {
    getPostsByUser(user);
  }, []);

  // this function will take in a user parameter (object)
  const getPostsByUser = (userObject) => {
    console.log('get posts by user')
    axios.post('http://localhost:8080/feed/myposts', user)
    .then((response) => {
      // existing posts is an array of posts
      console.log('getpostsbyuser response data', response.data);
      setExistingPosts(response.data.rows);
    })
  }

  const getLikes = () => {
    axios.post("http://localhost:8080/profile/likes", user)
    .then((response) => {
      console.log("get likes counts", response);
      setLikesData({
        likes_count: response.data.rows[0].likes_count,
      });
    });
  }

  useEffect(() => {
    getLikes();
  }, []);

  let likes = likesData.likes_count;
  let username = profileUser;
  const location = "Toronto, CA";


  

  
  return (
    <Fragment>
    <Nav 
    user={props.user}/>
    <div className="profile">

      <UserProfile 
      username={username}
      myUsername={props.user?.name}
      likes={likes}
      location={location}
      />
      <Comments />
    <div className="recent-bopz">
      <h2> Recent Bopz </h2>
      <ProfilePostList 
      existingPosts={existingPosts.reverse()}
      />
    </div>
    </div>
    </Fragment>
  );
};
export default Profile;
