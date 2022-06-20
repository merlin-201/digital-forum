import React from "react";
import "./post.css"
import {
  Profile,
} from "../../../assets/images";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEllipsis, faReply } from '@fortawesome/free-solid-svg-icons';


export default function Post( { isOwn, isReplyToOwn } ) {
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

        <div className="col-sm-2 col-auto pl-0 text-end">
          <img src={Profile} className="profile-img" alt=""/>
        </div>

        <div className="col p-0 d-flex flex-column justify-content-end">
          <div>
              <span className="fw-bold user-name">Jane Doe</span>
              <span className="text-muted small mx-2">&#9679;&nbsp;15d</span>
          </div>

          <div>
              <span className="text-muted small">@johny_doe</span>
          </div>

        </div>

      </div>

      <div className="row py-sm-2 pt-3 ps-sm-0 px-3 justify-content-end">

        {/* Text */}
        <div className="col-sm-10 col-12 text-wrap px-0">
            <span>
              For me, getting my business website made was a lot of tech
              wizardry things. Thankfully i get an ad on Facebook ragarding
              commence website. I get connected with BBB team. They made my
              stunning website live in just 3 days. With the increase demand
              of online customers.
            </span>
        </div>

        {/* Buttons */}
        <div className="col-sm-10 col-12 pt-3 px-0">

            <div className="row justify-content-around gx-sm-3 gx-2">

              {/* Upvote Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className={`action-btn upvote ${isUpvoted ? "active" : ""}`} onClick={handleUpvote}>
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span className="small ms-sm-3 ms-2">69</span>
                </button>
              </div>

              {/* Downvote Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className={`action-btn downvote ${isDownvoted ? "active" : ""}`} onClick={handleDownvote}>
                  <FontAwesomeIcon icon={faArrowDown} />
                  <span className="small ms-sm-3 ms-2">69</span>
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
                <button className="action-btn downvote">
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>

            </div>

        </div>

      </div>

    </div>
  );
}