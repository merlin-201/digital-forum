import React from "react";
import TopicCards from "../TopicCards/TopicCards";

import "./ExploreTopics.css"


export default function ExploreTopics() {

  return (
      <div className="card">

        <div className="card-header">
          <h2 className="fw-bold">Explore Topics</h2>
        </div>

        <div className="card-header px-4 select-category">

          <p className="nav-pills-header my-2 fw-bold">Select Category :</p>

          <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
              <button className="nav-link active">Cryptocurrency</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Stocks</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Mutual Funds</button>
            </li>
          </ul>

        </div>

        <div className="card-body">
          <TopicCards />
        </div>

      </div>

  )
}
