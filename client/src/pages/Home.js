import React from 'react';

import Trending from '../components/Trending/Trending';
import UserRank from '../components/UserRank/UserRank';
import Advertisements from '../components/Advertisements/Advertisements';
import ExploreTopics from '../components/ExploreTopics/ExploreTopics';


export default function Home() {
    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="col-lg-9">

                    <div className="row">

                        <div className="col-lg-4 d-none d-lg-block d-flex flex-column ">
                            <UserRank />
                            <Trending /> 
                        </div>

                        <div className="col-lg-8">
                            <ExploreTopics />
                        </div>

                    </div>

                </div>


                <div className="col-lg-3 d-none d-lg-block">
                    <Advertisements />
                </div>

            </div>
        </div>
    )

            
}
