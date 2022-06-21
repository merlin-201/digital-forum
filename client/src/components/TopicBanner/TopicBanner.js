import React from 'react'

import { getImage } from '../../services/image'

function TopicBanner({topic}) {
    let style={
        backgroundColor : "#eeeeee"
    }
  return (
    <div className="card d-flex flex-row pt-4 pb-2 px-4" style={style}>
        <div className="topic-logo">
            <img src={getImage(topic.thumbnail)} className="rounded-circle" width="120px" alt="" />
        </div>
        <div className="info d-flex flex-column ms-4 mb-3 justify-content-end">
            <h1 className='fw-bold'>{topic.name}</h1>
            <span className="fs-6 fw-bold">{topic.followers_count} Followers</span>
        </div>
    </div>
  )
}

export default TopicBanner