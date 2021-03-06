import React from "react";
import "./post.css"
import {
  Profile,
} from "../../../assets/images";

import moment from "moment"

import { Link } from "react-router-dom";

/* ------------------------------ font awesome ------------------------------ */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEllipsis, faFlag, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';

/* ------------------------------- react-redux ------------------------------ */
import { useDispatch, useSelector } from "react-redux";

/* --------------------------------- actions -------------------------------- */
import { downvotePost, unDownvotePost, unUpvotePost, upvotePost } from "../../../actions/posts";
import { showModal } from "../../../actions/authModal";
import { showPostInputPopup, tagUserInPostInput } from "../../../actions/postInputPopup";


export default function Post( { post } ) {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector( state => state.auth.user ? true : false);
  const user = useSelector( state => state.auth.user);
  const isOwn = (user?.id) ? ( user?.id === post.user?.id ) : false;
  const isReplyToOwn = (user?.id) ? ( user?.id === post.tagged_user?.id ) : false;

  /* -------------------------------- functions ------------------------------- */
  const handleUpvote = () => {
    if( !isUserLoggedIn ){
      dispatch( showModal('login') );
      return;
    }
      
    if(post.user_vote !== 1)
      dispatch( upvotePost(post.id) );
    else
      dispatch( unUpvotePost(post.id));
  }

  const handleDownvote = () => {
    if( !isUserLoggedIn ){
      dispatch( showModal('login') );
      return;
    }

    if(post.user_vote !== -1)
      dispatch( downvotePost(post.id) );
    else
      dispatch( unDownvotePost(post.id) );
  }

  const handleReply = () => {
    if( !isUserLoggedIn ){
      dispatch( showModal('login') );
      return;
    }
    
    dispatch( tagUserInPostInput(post.user.id, post.user.username) );
    dispatch( showPostInputPopup() );
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
              <span className="fw-bold user-name">{post.user.firstname} {post.user.lastname}</span>
              <span className="text-muted small mx-2">&#9679;&nbsp;{moment(post.created_at).fromNow()}</span>
          </div>

          <div>
              <Link to="#">
                <span className="text-muted small">@{post.user.username}</span>
              </Link>
              
          </div>

        </div>

      </div>

      <div className="row py-lg-2 pt-3 ps-lg-0 px-3 justify-content-end">

        {/* Text */}
        <div className="col-lg-10 col-12 text-wrap px-0">
            {( post.tagged_user &&
              <>
                <Link to="#">
                  <span className="text-primary">@{post.tagged_user.username}</span>
                </Link>
                
                &nbsp;&nbsp;
              </>
            )}
            <span>
              {post.text}
            </span>
        </div>

        {/* Buttons */}
        <div className="col-lg-10 col-12 pt-3 px-0">

            <div className="row justify-content-around gx-sm-3 gx-2">

              {/* Upvote Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className={`action-btn upvote ${post.user_vote === 1 ? "active" : ""}`} onClick={handleUpvote}>
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span className="small ms-sm-3 ms-2">{post.upvote_count}</span>
                </button>
              </div>

              {/* Downvote Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className={`action-btn downvote ${post.user_vote === -1 ? "active" : ""}`} onClick={handleDownvote}>
                  <FontAwesomeIcon icon={faArrowDown} />
                  <span className="small ms-sm-3 ms-2">{post.downvote_count}</span>
                </button>
              </div>

              {/* Reply Button */}
              <div className="col-3 d-flex justify-content-center">
                <button className="action-btn downvote" onClick={handleReply}>
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