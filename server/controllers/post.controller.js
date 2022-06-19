const mysql = require("mysql");

const { queryAsync } = require("../services/database");
const { filterPostObject } = require("../services/queryObjectFilters");

exports.getAllPosts = async (req, res) => {
    try {
        let q = 
        `SELECT post.*,` +
            `user.firstname AS user_firstname, ` +
            `user.lastname AS user_lastname, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 1) AS upvote_count, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 0) AS downvote_count ` +
        `FROM post, user `+
        `WHERE user.id = post.user_id`
        let posts = await queryAsync(q);

        posts = posts.map( (post) => filterPostObject(post) );

        res.status(200).json( {
            count : posts.length,
            data : posts
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json( {message : "Something went wrong"})
    }
}

exports.getPost = async (req, res) => {
    try {
        let postId = req.params.id;

        let q = 
        `SELECT post.*,` +
            `user.firstname AS user_firstname, ` +
            `user.lastname AS user_lastname, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 1) AS upvote_count, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 0) AS downvote_count ` +
        `FROM post, user `+
        `WHERE user.id = post.user_id AND post.id = ?`

        q = mysql.format(q, [postId]);

        let [post] = await queryAsync(q);

        post = filterPostObject(post);

        res.status(200).json(post);
        
    } catch (error) {
        console.log(error);
        res.status(500).json( {message : "Something went wrong"});
    }
}

exports.getPostsByTopic = async (req, res) => {
    let topicId = req.params.id
    try {
        let q = 
        `SELECT post.*,` +
            `user.firstname AS user_firstname, ` +
            `user.lastname AS user_lastname, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 1) AS upvote_count, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 0) AS downvote_count ` +
        `FROM post, user `+
        `WHERE user.id = post.user_id AND post.topic_id = ?`;

        q = mysql.format(q, [topicId]);
        let posts = await queryAsync(q);


        posts = posts.map( (post) => filterPostObject(post) );

        res.status(200).json( {
            count : posts.length,
            data : posts
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json( {message : "Something went wrong"})
    }
}


exports.createPost = async (req, res) => {
    let { topic_id, user_id, text } = req.body;

    try {
        let q = "INSERT INTO post (topic_id, user_id, text) VALUES (?, ?, ?)";
        q = mysql.format(q, [topic_id, user_id, text]);

        let result = await queryAsync(q);

        // if some unexpected error does not cause the insertion
        if(result.affectedRows === 0)
            return res.sendStatus(424);

        q = 
        `SELECT post.*,` +
            `user.firstname AS user_firstname, ` +
            `user.lastname AS user_lastname, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 1) AS upvote_count, ` +
            `(SELECT COUNT(*) FROM post_vote_mapping WHERE post_id = post.id AND vote = 0) AS downvote_count ` +
        `FROM post, user `+
        `WHERE user.id = post.user_id AND post.id = ?`;
        
        q = mysql.format(q, [result.insertId]);

        let [post] = await queryAsync(q);

        post = filterPostObject(post);

        res.status(201).json(post);


    } catch (error) {
        console.log(error);
        res.status(500).json( {message : "Something went wrong"})
    }
}

// don't get scared by the below syntax, Its just a function returning another function.
// REASON : to generalise our addPostValue controller for both upvoting and downvoting we need to add a pramater "vote"
// "vote" is mentioned in the controller call in the routing file
// but all controllers require the (req, res) signature. So (vote, req, res) wont make sense
// our controller takes in voteType as the argument and returns another controller with the normal (req, res) as the arguments

exports.addPostVote = (vote) => async (req, res) => {
    let postId = parseInt(req.params.id);
    let { user_id : userId } = req.body;
    try {
        let q = "INSERT INTO post_vote_mapping ( post_id, user_id, vote ) VALUES ( ?, ?, ?)";
        q = mysql.format(q, [postId, userId, vote]);

        let result = await queryAsync(q);
        // if the postVote already exists then a "ER_DUP_ENTRY" will occur here
        // this is dealt with in the catch block

        if(result.affectedRows !== 0)
            res.sendStatus(204);
        else
            res.sendStatus(424);

    } catch (error) {
        if( error.code === "ER_DUP_ENTRY"){
            let q = "UPDATE post_vote_mapping SET vote = ? WHERE post_id = ? AND user_id = ?";
            q = mysql.format(q, [vote, postId, userId]);

            let result = await queryAsync(q);

            if(result.affectedRows !== 0)
                res.sendStatus(204);
            else
                res.sendStatus(424);
        }
        else{
            console.log(error);
            res.status(500).json( { message : "Something went wrong."} );
        }
            
    }
}

exports.deletePostVote = (vote) => async (req, res) => {
    try {
        let postId = parseInt(req.params.id);
        let { user_id : userId } = req.body;

        let q = "DELETE FROM post_vote_mapping WHERE post_id = ? AND user_id = ? AND vote = ?";
        q = mysql.format(q, [postId, userId, vote]);

        let result = await queryAsync(q);

        if(result.affectedRows !== 0)
            res.sendStatus(204);
        else
            res.sendStatus(424);

    } catch (error) {
        console.log(error);
        res.status(500).json( { message : "Something went wrong."} );   
    }
}