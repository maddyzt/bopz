import PostListItem from "./PostListItem"

const PostList = (props) => {
  const posts = props.posts.map(post => {
    return (
      <PostListItem 
      key={post.id}
      songName={post.songName}
      songArtist={post.songArtist}
      username={post.username}
      />
    )
  })
  return (
    <div>
   {posts}
   </div>
  )

}

export default PostList