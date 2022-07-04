import React from 'react';

import { useSelector, useDispatch } from "react-redux";

import { getAllCategories } from "../actions/category";

import Trending from '../components/Trending/Trending';
import UserRank from '../components/UserRank/UserRank';
import Advertisements from '../components/Advertisements/Advertisements';
import ExploreTopics from '../components/ExploreTopics/ExploreTopics';
import { clearPosts } from '../actions/posts';
import { useSearchParams } from 'react-router-dom';

export default function Home() {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    // this is used to already select a particular category from the dropdown right when the page is loaded
    // by default the first category is selected
    const selectedCategoryId = searchParams.get('cat') || null;
    
    React.useEffect( () => {
       dispatch( getAllCategories( selectedCategoryId ) );
       dispatch( clearPosts() );
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
