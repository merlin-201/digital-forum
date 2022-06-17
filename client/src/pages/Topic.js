import React from "react";
import { Link } from "react-router-dom";
import Advertisements from "../components/Advertisements/Advertisements";

import Post from "../components/Post/Post";
import TopicBanner from "../components/TopicBanner/TopicBanner";
import TopUsers from "../components/TopUsers/TopUsers";

export default function Topic() {
    return (
        <div className="container-fluid dashboard">
            
            <nav>
                <ol className="breadcrumb">
                    <Link to="/" className="breadcrumb-item">Home</Link>
                    <Link to="/" className="breadcrumb-item">Cryptocurrency</Link>
                    <Link to="/" className="breadcrumb-item active">Doge Coin</Link>
                </ol>
            </nav>

            <div className="row">
                <div className="col-lg-9">

                    <div className="container p-0">
                        <div className="row">
                            <TopicBanner />
                        </div>

                        <div className="row">

                            <div className="col-lg-3 ps-0 d-none d-lg-block">
                                <TopUsers />
                            </div>

                            <div className="col-lg-9 pe-0">
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                            </div>

                        </div>
                    </div>

                </div>

                <div className="col-lg-3 d-none d-lg-block">
                    <Advertisements />
                </div>
            </div>
            
            
        </div>
    );
}
