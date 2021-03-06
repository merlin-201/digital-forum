import React from 'react'

import TopicCard from './TopicCard/TopicCard'


function TopicCards({topics}) {
  return (
    <div className="row p-sm-3 py-3 px-2">
        {
          topics.map( (topic) => <TopicCard topic={topic} key={topic.id}/> )
        }
    </div>
  )
}

export default TopicCards