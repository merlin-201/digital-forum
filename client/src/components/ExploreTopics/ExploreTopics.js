import React from "react";

import CategoryDescription from "./CategoryDescription/CategoryDescription";
import TopicCards from "./TopicCards/TopicCards";

import "./ExploreTopics.css"


export default function ExploreTopics() {

  return (
      <div className="card">

        <div className="card-header">
          <h5 className="text-brand-blue fw-bold">Explore Topics :</h5>

          <div className="dropdown dropend">
            <button className="btn dropdown-toggle px-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Select Category&nbsp;
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item" >Cryptocurrency</li>
              <li className="dropdown-item" >Stocks</li>
              <li className="dropdown-item" >Mutual Funds</li>
            </ul>
          </div>

        </div>

        <div className="card-header px-4 select-category">
          <CategoryDescription />
        </div>

        <div className="card-body px-sm-3 px-1">
          <TopicCards />
        </div>

      </div>

  )
}
