import React from 'react'

import DogecoinLogo from "../../assets/images/dogecoin.png"

function TopicBanner() {
    let style={
        backgroundColor : "#fff0b5"
    }
  return (
    <div className="card d-flex flex-row pt-4 pb-2 px-4" style={style}>
        <div className="topic-logo">
            <img src={DogecoinLogo} className="rounded-circle" width="120px" alt="" />
        </div>
        <div className="info d-flex flex-column ms-4 mb-3 justify-content-end">
            <h1 className='fw-bold'>Doge Coin</h1>
            <span className="fs-6 fw-bold">15.3K Followers</span>
        </div>
    </div>
  )
}

export default TopicBanner