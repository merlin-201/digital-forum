import React from "react";

import {useDispatch, useSelector} from "react-redux"

import CategoryDescription from "./CategoryDescription/CategoryDescription";
import TopicCards from "./TopicCards/TopicCards";

import "./ExploreTopics.css"
import { setCurrentCategory } from "../../actions/category";


export default function ExploreTopics( { allCategories } ) {
    const dispatch = useDispatch();

    const selectedCategory = useSelector( (state) => state.category.currentCategory );

    /* -------------------------------- functions ------------------------------- */
    const handleCategorySelection = (category) => {
      dispatch( setCurrentCategory(category.id) );
    }

    console.log(selectedCategory);

    return (selectedCategory) && (
        <div className="card">

          <div className="card-header">
            <h5 className="text-brand-blue fw-bold">Explore Categories :</h5>

            <div className="dropdown dropend">
              <button className="btn dropdown-toggle px-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedCategory.name}&nbsp;
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                  allCategories.map( (category) => (
                    <li className="dropdown-item" onClick={() => handleCategorySelection(category)} key={category.id}>
                      {category.name}
                    </li>
                  ) 
                  )
                }
              </ul>
            </div>

          </div>

          <div className="card-header px-4 select-category">
            <CategoryDescription category={selectedCategory}/>
          </div>

          <div className="card-body px-sm-3 px-1">
            <TopicCards topics={selectedCategory.topics}/>
          </div>

        </div>
      )
}
