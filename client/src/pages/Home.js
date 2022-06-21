import React from 'react';

import { useSelector, useDispatch } from "react-redux";

import { getAllCategories } from "../actions/category";

import Trending from '../components/Trending/Trending';
import UserRank from '../components/UserRank/UserRank';
import Advertisements from '../components/Advertisements/Advertisements';
import ExploreTopics from '../components/ExploreTopics/ExploreTopics';

export default function Home() {

    const dispatch = useDispatch();
    
    React.useEffect( () => {
       dispatch( getAllCategories() );
       console.log("fetched all categories");
    },[]);

    const allCategories = useSelector( state => state.category.allCategories );
    const currentCategory = useSelector( state => state.category.currentCategory);

    return (allCategories.length !== 0 && currentCategory) && (
        <div className="container-fluid dashboard px-3">
            <div className="row">

                {/* LHS - User Rank and Trending Topics */}
                <div className="col-lg-3 d-lg-block d-none d-flex flex-column">
                    <UserRank />
                    <Trending /> 
                </div>
                
                {/* Explore Topics */}
                <div className="col-lg-6 col-md-8">
                    <ExploreTopics allCategories={allCategories} />
                </div>

                {/* Ads */}
                <div className="col-lg-3 col-md-4 d-md-block d-none">
                    <Advertisements />
                </div>

            </div>
        </div>
    )

            
}
