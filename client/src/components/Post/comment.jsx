import { useState } from "react";

export default function Comment() {
  const username = "@rave "
  const [comment, setComment] = useState(username);

  return (
    <>
      <div className="card shadow-lg p-0 mb-5 bg-body rounded">
        <h5 className="card-header mb-3"> <strong>Comment</strong> </h5>
        <div className="card-body">
          <textarea className="form-control cardHeight" placeholder="Leave a comment here" id="floatingTextarea2"
            style={{ height: 200 }}
            name="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}></textarea>
          <div className="float-end mt-2">
            <button type="button" className="btn btn-outline-primary btn-sm m-2">Cancel</button>
            <button type="button" className="btn btn-primary btn-sm">Post comment</button>
          </div>
        </div>
      </div>
      <div>
        <h6> <strong>Temporary Space to Display Comment</strong> </h6>
        {comment}
      </div>

    </>
  );
}