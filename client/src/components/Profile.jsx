import React, { Component } from 'react'
import { renderMatches } from 'react-router-dom';

import UserProfile from 'react-user-profile'

const Profile = () => {
  const photo = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  const userName = "John Smith"

  const bopz = [
    {
      id: 1,
      songName: "I knew you were trouble",
      artist: "Taylor Swift",
      date: "2015-09-09"
    }
  ]

  return (
    <div style={{ margin: '0 auto', width: '100%' }}>
      <UserProfile photo={photo} userName={userName} initialFollowingCount={723} initialFollowersCount={4433} initialBopz={bopz} />
    </div>
  )
}
export default Profile