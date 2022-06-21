import React from 'react'
import { Link } from 'react-router-dom'

import DogecoinLogo from "../../../../assets/images/dogecoin.png"

import "./TopicCard.css"

function TopicCard() {
  return (
    <Link to="/topic" className="col-xl-4 col-md-6 text-reset">
            <div className="card shadow py-3 mb-sm-3 mb-2 topic-card">
                <div className="row">

                  <div className="col-sm-12 col-auto d-flex justify-content-center mb-sm-2 mb-0">
                    <img src={DogecoinLogo} className="rounded-circle" height="100px"alt="" />
                  </div>

                  <div className="col-sm-12 col text-sm-center text-start d-flex flex-column justify-content-center">
                    <h4 className="topic-name">Dogecoin</h4>
                    <p className="topic-followers">15.3K Followers</p>
                    <span className="topic-comments">115 New Comments</span>
                  </div>

                  {/* <div className="col-sm-12 col-auto d-flex text-center">
                    
                  </div> */}

                </div>
                
                
                
            </div>
    </Link>
  )
}

export default TopicCard