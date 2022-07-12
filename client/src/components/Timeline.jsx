import PropTypes from "prop-types";
import Message from "./MessageInRecentBopz.jsx";
import "./Timeline.css";

function Timeline({ tweets }) {
  return (
    <ul className="timeline">
      {tweets.map(({ id, user, created_on, content }) => (
        <li key={id} className="timeline-item">
          <Message user={user} createdOn={created_on}>
            {content}
          </Message>
        </li>
      ))}
    </ul>
  );
}

Timeline.propTypes = {
  tweets: PropTypes.array,
};

export default Timeline;
