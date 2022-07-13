import React from "react";
import RecentBopz from "./RecentBopz";
import UserProfile from "react-user-profile";
import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});

  const getUserData = () => {
    axios.get("http://localhost:8080/feed/user").then((response) => {
      console.log("response reached", response);
      setUserData({
        id: response.data.rows[0].id,
        username: response.data.rows[0].username,
      });
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const photo =
    "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
  const userName = userData.username;
  const location = "Toronto, CA";

  const comments = [
    {
      id: 1,
      photo:
        "https://media.istockphoto.com/photos/funny-winking-kitten-picture-id1267021092?k=20&m=1267021092&s=612x612&w=0&h=yzwxZXklHn5NwDTgKmbq2Ojtg3pga6j8K3oT7lLneAY=",
      userName: "Marc Anthony",
      content: "Wow I love all your Bopz!",
      createdAt: 1543858000000,
    },
  ];

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      <UserProfile
        photo={photo}
        userName={userName}
        location={location}
        initialFollowingCount={700}
        initialFollowersCount={4433}
        initialComments={comments}
      />
      <h2> Recent Bopz </h2>
      <RecentBopz />
    </div>
  );
};
export default Profile;
