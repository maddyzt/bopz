import "./UserProfile.css";
import { useState } from 'react';

const UserProfile = (props) => {
  const [followedStatus, updateFollowedStatus] = useState();

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
      <button className="follow-button" onClick={followUser}>Follow</button>
      </main>
    </div>
  )
}

export default UserProfile;