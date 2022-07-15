import ProfilePostListItem from './ProfilePostListItem';

const ProfilePostList = (props) => {
  const existingPosts = props.existingPosts.map(existingPost => {
    return (
      <ProfilePostListItem
      key={existingPost.tag_id}
      id={existingPost.tag_id}
      songName={existingPost.song_name}
      songArtist={existingPost.song_artist}
      username={existingPost.username}
      userId={existingPost.user_id}
      songId={existingPost.song_id}
      likes={existingPost.likes}
      albumName={existingPost.album}
      coverArt={existingPost.cover_art}
      />
    )
  })

  return (
    <div>
      {existingPosts}
    </div>
  )
}
export default ProfilePostList