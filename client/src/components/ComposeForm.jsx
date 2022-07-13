import { useState } from "react";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import "./ComposeForm.css";

function ComposeForm({ onSubmit }) {
  const [editorValue, setEditorValue] = useState("");
  console.log(editorValue);

  const handleEditorValueChange = (e) => {
    setEditorValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editorValue);
    setEditorValue("");
  };

  return (
    <form className="compose-form" onSubmit={handleSubmit}>
      <div className="compose-form-container">
        <Avatar />
        <textarea
          value={editorValue}
          onChange={handleEditorValueChange}
          className="compose-form-textarea"
          placeholder="What's boppin?"
        />
      </div>
      <button className="compose-form-submit">Bop</button>
    </form>
  );
}

ComposeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ComposeForm;
