import React from "react";
import "./post.css"
import {
  Profile,
} from "../../../assets/images";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEllipsis, faFlag, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Post( { isOwn, isReplyToOwn, post } ) {
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);

  /* -------------------------------- functions ------------------------------- */
  const handleUpvote = () => {
    setIsUpvoted(true);
    setIsDownvoted(false);
  }

  const handleDownvote = () => {
    setIsUpvoted(false);
    setIsDownvoted(true);
  }

  return (
    <div className={`card container px-0 pb-3 mb-2 ${isOwn ? "own" : ""} ${isReplyToOwn ? "is-reply-to-own" : ""}`}>


      {/* Header */}
      <div className="row pt-2">

        <div className="col-lg-2 col-auto pl-0 text-end">
          <img src={Profile} className="profile-img" alt=""/>
        </div>

        <div className="col p-0 d-flex flex-column justify-content-end">
          <div>
              <span className="fw-bold user-name">{post.user_firstname} {post.user_lastname}</span>
              <span className="text-muted small mx-2">&#9679;&nbsp;15d</span>
          </div>

          <div>
              <span className="text-muted small">@{post.user_firstname?.toLowerCase()}</span>
          </div>

        </div>

      </div>

      <div className="row py-lg-2 pt-3 ps-lg-0 px-3 justify-content-end">

        {/* Text */}
        <div className="col-lg-10 col-12 text-wrap px-0">
            <span>
              {post.text}
            </span>
        </div>

        {/* Buttons */}
        <div className="col-lg-10 col-12 pt-3 px-0">

            <div className="row justify-content-around gx-sm-3 gx-2">

              {/* Upvote Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className={`action-btn upvote ${isUpvoted ? "active" : ""}`} onClick={handleUpvote}>
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span className="small ms-sm-3 ms-2">{post.upvote_count}</span>
                </button>
              </div>

              {/* Downvote Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className={`action-btn downvote ${isDownvoted ? "active" : ""}`} onClick={handleDownvote}>
                  <FontAwesomeIcon icon={faArrowDown} />
                  <span className="small ms-sm-3 ms-2">{post.downvote_count}</span>
                </button>
              </div>

              {/* Reply Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className="action-btn downvote">
                  <FontAwesomeIcon icon={faReply} />
                  <span className="small ms-2 d-sm-inline d-none">Reply</span>
                </button>
              </div>

              {/* More Button */}
              <div className="col-3 d-flex justify-content-center">
                <div className="dropup">
                  
                  <button className="action-btn downvote dropdown-toggle" data-bs-toggle="dropdown">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>

                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li className="dropdown-item" >
                      <FontAwesomeIcon icon={faFlag} />
                      &nbsp;&nbsp;Report
                    </li>

                    <li className="dropdown-item" >
                      <FontAwesomeIcon icon={faTrash} />
                      &nbsp;&nbsp;Delete
                    </li>
            
                  </ul>
                </div>
              </div>
            </div>

        </div>

      </div>

    </div>
  );
}