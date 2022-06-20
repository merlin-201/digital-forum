import { useState } from "react";

import "./PostInput.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function PostInput({ setShowCommentBox }) {
  const [comment, setComment] = useState("");

  return (
    <div className="card shadow-lg rounded comment-box">

      <div className="card-header d-flex justify-content-between">
        <strong className="fs-5">Comment</strong>
        <FontAwesomeIcon icon={faClose} className="fs-3 mx-3" style={{cursor : "pointer"}} onClick={ () => setShowCommentBox(false)}/>
      </div>

      <div className="card-body pb-2">

        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          style={{ height: 150 }}
          name="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}>
        </textarea>

        <div className="float-end mt-2">
          <button type="button" className="btn btn-primary px-4">Post</button>
        </div>
      </div>
    </div>
  );
}