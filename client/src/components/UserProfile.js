import "./UserProfile.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

const UserProfile = (props) => {
  const [followedStatus, updateFollowedStatus] = useState();
  const { id } = useParams();
  console.log('useParams id', id); 

  let userObject = {
    myUsername: sessionStorage.getItem("user_name"),
    friendUsername: id
  }

  const getFollowedStatus = (userObject) => {
    axios.post('http://localhost:8080/profile/follow/status', userObject)
    .then(response => {
      console.log('getFollowedStatus', response);

      if (response.data.rows[0]) {
        updateFollowedStatus(true);
      } else {
        updateFollowedStatus(false);
      }
    })
  };

  console.log('after followedstatus api call and update', followedStatus)
  useEffect(() => {
    getFollowedStatus(userObject)
  }, []);

  
  const updateFollow = () => {
    if (followedStatus) {
      updateFollowedStatus(false);
    } else {
      updateFollowedStatus(true);
    }
  }

  return (
    <div className="user-profile">
      <header className="user-profile-header">
      <img src="./images/minion.jpeg" alt="img" className="avatar" />
      <div className="name-location">
      <h1>{props.username}</h1>
      <h5>{props.location}</h5>
      </div>
      </header>
      <main className="user-profile-main">
      <div>Likes: {props.likes}</div>
      <div>Following: {props.following}</div>
      <div>Followers: {props.followers}</div>
      {followedStatus ? 
      <button className="follow-button" onClick={updateFollow}>Unfollow</button> : 
      <button className="follow-button" onClick={updateFollow}>Follow</button>
      }
      </main>
    </div>
  )
}

export default UserProfile;