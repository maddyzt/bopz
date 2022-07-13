import React from "react";
import RecentBopz from "./RecentBopz";
// import UserProfile from "react-user-profile";
import axios from "axios";
import { useState, useEffect } from "react";
import UserProfile from './UserProfile';
import "./Profile.css";

const Profile = () => {
  const [followData, setFollowData] = useState({});
  const [likesData, setLikesData] = useState({});

  const user = {
    username: sessionStorage.getItem("user_name")
  }

  const getFollowCounts = () => {
    axios.post("http://localhost:8080/profile/follows", user)
    .then((response) => {
      console.log("get follow counts", response);
      setFollowData({
        followed_count: response.data.rows[0].followed_count,
        follower_count: response.data.rows[0].follower_count
      });
    });
  };

  useEffect(() => {
    getFollowCounts();
  }, []);

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

  let following = followData.follower_count;
  let followers = followData.followed_count;
  let likes = likesData.likes_count;
  let username = sessionStorage.getItem("user_name");
  const location = "Toronto, CA";

  // const photo =
  //   "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
  // // const userName = userData.username;
 

  // const comments = [
  //   {
  //     id: 1,
  //     photo:
  //       "https://media.istockphoto.com/photos/funny-winking-kitten-picture-id1267021092?k=20&m=1267021092&s=612x612&w=0&h=yzwxZXklHn5NwDTgKmbq2Ojtg3pga6j8K3oT7lLneAY=",
  //     userName: "Marc Anthony",
  //     content: "Wow I love all your Bopz!",
  //     createdAt: 1543858000000,
  //   },
  // ];

  return (
    <div className="profile">
      {/* <UserProfile
        photo={photo}
        userName={username}
        location={location}
        initialFollowingCount={700}
        initialFollowersCount={4433}
        initialComments={comments}
      /> */}
      <UserProfile 
      username={username}
      likes={likes}
      following={following}
      followers={followers}
      location={location}
      />
    <div className="recent-bopz">
      <h2> Recent Bopz </h2>
      <RecentBopz />
    </div>
    </div>
  );
};
export default Profile;
