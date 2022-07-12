import PropTypes from "prop-types";
import "./MessageInRecentBopz.css";
import Avatar from "./Avatar";

function Message(props) {
  const { user, createdOn, children } = props;
  return (
    <div className="tweet">
      <Avatar name={user} />
      <div>
        <div className="tweet-header">
          <span className="tweet-user">@{user}</span>·
          <span className="tweet-created-on">{createdOn}</span>
        </div>
        <div className="tweet-content">{children}</div>
      </div>
    </div>
  );
}

Message.propTypes = {
  user: PropTypes.string,
  createdOn: PropTypes.string,
};
export default Message;
