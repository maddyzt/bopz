import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./RecentBopz.css";
import initalTweets from "../tweets.json";
import "./MessageInRecentBopz.css";
import Timeline from "./Timeline";
import Message from "./MessageInRecentBopz";
import ComposeForm from "./ComposeForm";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecentBopz = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState([]);
  let userObject = {
    myUsername: sessionStorage.getItem("user_name"),
    friendUsername: id,
  };
  const getPostData = () => {
    // axios.post('http://localhost:8080/profile/posts', userObject)
    // .then(response => {
    //   console.log('post post data response', response);
    //   let post = response.data.rows.map (post => {
    //     songName = post.song_name,
    //     songArtist = post.song_artist,
    //     date = post.created_at,
    //     likes = post.likes,
    //     coverArt = post.cover_art,
    //     album = post.album
    //   })
    //   console.log('mapped post data', post)
    //   let newPostData = [...postData, post];
    //   setPostData(newPostData);
    // })
    // axios.get("http://localhost:8080/feed/user").then((response) => {
    //   console.log("response reached", response);
    //   setUserData({
    //     id: response.data.rows[0].id,
    //     username: response.data.rows[0].username,
    //   });
    // });
  };

  // useEffect(() => {
  //   getPostData();
  // }, []);

  // console.log('posData after function', postData);
  // const posts = postData.map(post => {
  //   return (
  //     <Message
  //     coverArt={postData.coverArt}
  //     user={id}
  //     date={postData.date}
  //     songName={postData.song_name}
  //     songArtist={postData.song}
  //     likes={postData.likes}
  //     />

  //   )
  // })

  return <div></div>;

  //   const [tweets, setTweets] = useState(initalTweets);

  //   const handlePostTweet = (content) => {
  //     const newTweet = {
  //       content,
  //       id: nanoid(),
  //       created_on: Date(Date.now()),
  //       user: id,
  //       comments_count: 0,
  //       retweets_count: 0,
  //       favorites_count: 0,
  //     };
  //     setTweets([...tweets, newTweet]);
  //   };
  //   return (
  //     <div className="app">
  //       <div className="separator"></div>
  //       <Timeline tweets={tweets} />
  //     </div>
  //   );
  // };

  // const CommentButton = () => <i className="far fa-comment" />;
  // const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;
  // const LikeButton = () => <i className="fa fa-heart like-button" />;
  // const ShareButton = () => <i className="fas fa-external-link-alt" />;
  // ReactDOM.render(<RecentBopz />, document.querySelector("#root"));
};

export default RecentBopz;

// const RecentBopz = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className="wrapper">
//       <h2> Recent Bopz</h2>
//       <form onSubmit={handleSubmit}>
//         <fieldset>
//           <label>
//             <p>Name</p>
//             <input name="name" />
//           </label>
//         </fieldset>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default RecentBopz;

// const RecentBopz = () => {
//   const data = [
//     {
//       userId: "02b",
//       comId: "017",
//       fullName: "Lily",
//       userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
//       text: "I think you have a point🤔",
//       avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
//       replies: [],
//     },
//   ];

//   return (
//     <CommentSection
//       currentUser={{
//         currentUserId: "01a",
//         currentUserImg:
//           "https://ui-avatars.com/api/name=Riya&background=random",
//         currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
//         currentUserFullName: "Riya Negi",
//       }}
//       logIn={{
//         loginLink: "http://localhost:3001/",
//         signupLink: "http://localhost:3001/",
//       }}
//       commentData={data}
//       onSubmitAction={(
//         data
//         // userId: string
//         // comId: string
//         // avatarUrl: string
//         // userProfile?: string
//         // fullName: string
//         // text: string
//         // replies: any
//         // commentId: string
//       ) => console.log("check submit, ", data)}
//       currentData={(data) => {
//         console.log("curent data", data);
//       }}
//     />
//   );
// };

// export default RecentBopz;
