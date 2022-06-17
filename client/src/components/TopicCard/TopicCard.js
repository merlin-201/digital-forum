import React from 'react'
import { Link } from 'react-router-dom'

import DogecoinLogo from "../../assets/images/dogecoin.png"

import "./TopicCard.css"

function TopicCard() {
  return (
    <Link to="/topic" className="col-xl-4 col-md-6 text-reset">
            <div className="card shadow d-flex flex-column align-items-center p-3 topic-card">
                <img src={DogecoinLogo} className="rounded-circle" width="100px" alt="" />
                <span className="topic-name">Dogecoin</span>
                <span className="topic-followers">15.3K Followers</span>
                <span className="topic-comments">115 New Comments</span>
            </div>
    </Link>
  )
}

export default TopicCard