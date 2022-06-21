import React from 'react'

import TopicCard from './TopicCard/TopicCard'


function TopicCards() {
  return (
    <div className="row p-sm-3 py-2">
        <TopicCard />
        <TopicCard />
        <TopicCard />
        <TopicCard />
    </div>
  )
}

export default TopicCards