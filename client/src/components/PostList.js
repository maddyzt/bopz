import PostListItem from "./PostListItem"

const PostList = (props) => {
  const posts = props.posts.map(post => {
    return (
      <PostListItem 
      key={post.id}
      id={post.id}
      songName={post.songName}
      songArtist={post.songArtist}
      username={post.username}
      likes={post.likes}
      />
    )
  })

  const existingPosts = props.existingPosts.map(existingPost => {
    return (
      <PostListItem
      key={existingPost.tag_id}
      id={existingPost.tag_id}
      songName={existingPost.song_name}
      songArtist={existingPost.song_artist}
      username={existingPost.username}
      userId={existingPost.user_id}
      songId={existingPost.song_id}
      likes={existingPost.likes}
      />
    )
  })
  return (
    <div>
    <div>
   {posts}
   </div>
   <div>
   {existingPosts}
   </div>
   </div>
  )

}

export default PostList