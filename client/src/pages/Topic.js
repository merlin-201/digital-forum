import React from "react";
import { Link } from "react-router-dom";
import Advertisements from "../components/Advertisements/Advertisements";

import TopicBanner from "../components/TopicBanner/TopicBanner";
import TopUsers from "../components/TopUsers/TopUsers";
import PostInput from "../components/PostInput/PostInput"
import Posts from "../components/Posts/Posts";

export default function Topic() {
    const [showCommentBox, setShowCommentBox] = React.useState(false);


    return (
        <div className="container-xl dashboard p-0">

            <div className="row justify-content-center">

                <div className="col-md-11">

                    <nav>
                        <ol className="breadcrumb">
                            <Link to="/" className="breadcrumb-item">Home</Link>
                            <Link to="/" className="breadcrumb-item">Cryptocurrency</Link>
                            <Link to="/" className="breadcrumb-item active">Doge Coin</Link>
                        </ol>
                    </nav>
                </div>

                {/* Post */}
                <div className="col-md-8">

                    <div className="container p-0">

                        <div className="row">
                            <TopicBanner />
                        </div>

                        <div className="row">

                            <div className="col-lg-4 ps-0 pe-4 d-lg-block d-none">
                                <TopUsers />
                            </div>

                            <div className="col px-0" style={{ position : "relative" }}>
                                
                                <div className="row justify-content-end mb-3">
                                    <div className="col-auto">
                                        <button className="btn btn-primary" onClick={ () => setShowCommentBox(true)}>
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                                

                                <Posts />

                                {showCommentBox && <PostInput setShowCommentBox={setShowCommentBox}/>}

                            </div>
                        </div>

                    </div>
                </div>

                {/* Ad */}
                <div className="col-lg-3 col-md-4 d-md-block d-none">
                    <Advertisements />
                </div>

            </div>

        </div>

    );
}
