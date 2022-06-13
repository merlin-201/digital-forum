import React from 'react'

import TopicListItem from './TopicListItem'

import "./Trending.css"

export default function Trending() {
    return (
        <div className="card p-3">

            <div className="card-header">
                <h4>Trending Topics</h4>
            </div>

            <ul className="list-group list-group-flush">
                <TopicListItem />
                <TopicListItem />
                <TopicListItem />
                <TopicListItem />
                <TopicListItem />
            </ul>
        </div>
    )
}