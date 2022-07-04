import React from 'react'
import { Link } from 'react-router-dom'

import { getImage } from '../../../../services/image'

import "./TopicCard.css"

function TopicCard( {topic} ) {
  return (
    <Link to={`/topic/${topic.id}`} className="col-xl-4 col-md-6 text-reset">
            <div className="card shadow py-3 mb-sm-3 mb-2 topic-card">
                <div className="row">

                  <div className="col-sm-12 col-auto d-flex justify-content-center mb-sm-2 mb-0">
                    <img src={getImage(topic.thumbnail)} className="rounded-circle" height="80px"alt="" />
                  </div>

                  <div className="col-sm-12 col text-sm-center text-start d-flex flex-column justify-content-center">
                    <h4 className="topic-name">{topic.name}</h4>
                    <p className="topic-followers">{topic.followers_count} Followers</p>
                    {/* -------------------- Dummy New Comments Count for now -------------------- */}
                    <span className="topic-comments">{Math.floor(Math.random() * (100 - 11) + 11)} New Comments</span>
                  </div>

                </div>
                
                
                
            </div>
    </Link>
  )
}

export default TopicCard