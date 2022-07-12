import React from "react";
// import "react-comments-section/index.css";
import ReactDOM from "react-dom";
import "./RecentBopz.css";
import tweets from "../tweets.json";
import "./MessageInRecentBopz.css";
import Timeline from "./Timeline";

const RecentBopz = () => {
  return (
    <div className="app">
      <div className="separator"></div>
      <Timeline tweets={tweets} />
    </div>
  );
};

const CommentButton = () => <i className="far fa-comment" />;
const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;
const LikeButton = () => <i className="fa fa-heart like-button" />;
const ShareButton = () => <i className="fas fa-external-link-alt" />;
ReactDOM.render(<RecentBopz />, document.querySelector("#root"));

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
