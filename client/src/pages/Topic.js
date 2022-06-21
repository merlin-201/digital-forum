import React from "react";
import { Link, useParams } from "react-router-dom";
import Advertisements from "../components/Advertisements/Advertisements";

import TopicBanner from "../components/TopicBanner/TopicBanner";
import TopUsers from "../components/TopUsers/TopUsers";
import PostInput from "../components/PostInput/PostInput"
import Posts from "../components/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getTopic } from "../actions/topic";
import { getPosts } from "../actions/posts";

export default function Topic() {
    const dispatch = useDispatch();

    const [showCommentBox, setShowCommentBox] = React.useState(false);

    const topicId = parseInt( useParams().id );

    React.useEffect( () => {
        dispatch( getTopic(topicId) );
        dispatch( getPosts(topicId) );
    }, [])

    const topic = useSelector( (state) => state.topic)
    const posts = useSelector( (state) => state.posts)


    return (topic && topic.id === topicId && posts.length !== 0) && (
        <div className="container-xl dashboard p-0">

            <div className="row justify-content-center">

                <div className="col-md-11">

                    <nav>
                        <ol className="breadcrumb">
                            <Link to="/" className="breadcrumb-item">Home</Link>
                            <Link to={`/?cat=${topic.category_id}`} className="breadcrumb-item">{topic.category_name}</Link>
                            <Link to={`/topic/${topic.id}`} className="breadcrumb-item active">{topic.name}</Link>
                        </ol>
                    </nav>
                </div>

                {/* Post */}
                <div className="col-md-8">

                    <div className="container p-0">

                        <div className="row">
                            <TopicBanner topic={topic}/>
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
                                

                                <Posts posts={posts}/>

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
