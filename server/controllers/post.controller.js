const { Post, User, Topic, Vote } = require("../models");
const Sequelize = require("sequelize");

exports.getAllPosts = async (req, res) => {
    try {
        let posts = await Post.findAll({
            include : [
                {
                    model : User,
                    as : "user"
                },
                {
                    model : User,
                    as : "tagged_user",
                    attributes : ["id", "username"]
                },
                {
                    model : Topic,
                    as : "topic"
                }
            ]
        });

        res.status(200).json({
            count : posts.length,
            data : posts
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json( {message : "Something went wrong"})
    }
}


exports.getPost = async (req, res) => {
    const postId = req.params.id;
    try {

        let post = await Post.findOne({
            where : { id : postId },
            include : [
                {
                    model : User,
                    as : "user"
                },
                {
                    model : User,
                    as : "tagged_user",
                    attributes : ["id", "username"]
                },
                {
                    model : Topic,
                    as : "topic"
                }
            ]
        })

        if(!post)
            return res.status(404).json( { message : "No Post found with such ID"} );
        
        res.status(200).json(post);
        
    } catch (error) {
        console.log(error);
        res.status(500).json( {message : "Something went wrong"});
    }
}


exports.getPostsByTopic = async (req, res) => {
    let topicId = req.params.id;
    let userId = res.locals?.user?.id;

    try {

        let posts = await Post.findAll({
            where : { topic_id : topicId },
            attributes : {
                include : [
                    // sequelize gives a complicated way of counting associations
                    // as a workaroud we are passing some counts directly as Literals
                    [ Sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post_id = post.id AND vote = 1)`), "upvote_count"],
                    [ Sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post_id = post.id AND vote = -1)`), "downvote_count"],
                    
                    // WHAT IS HAPPENING BELOW ?
                    // we need to get the user_vote only if the user is making a Authenthicated request i.e userId is present ( token is being sent )
                    // we write a ternary ... that returns AND SPREADS two arrays conditionally... one if TRUE ..other empty array if FALSE
                    ...( userId
                        ? [ [ Sequelize.literal(`(SELECT vote FROM vote WHERE user_id = "${userId}" AND post_id = post.id)`), "user_vote"] ]
                        : []
                    )
                ],
                exclude : ["user_id", "tagged_user_id", "topic_id"] 
            },
            include : [
                {
                    model : User,
                    as : "user"
                },
                {
                    model : User,
                    as : "tagged_user",
                    attributes : ["id", "username"]
                },
            ],
            order : [ ["created_at", "DESC"] ]
        });

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
    let { id : userId } = res.locals.user;

    try {

        let newPost = await Post.create({
            text : req.body.text,
            user_id : userId,
            topic_id : req.body.topic_id,
            tagged_user_id : req.body.tagged_user_id
        });

        let post = await Post.findOne({
            where : { id : newPost.id },
            attributes : {
                include : [
                    // sequelize gives a complicated way of counting associations
                    // as a workaroud we are passing some counts directly as Literals
                    [ Sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post_id = post.id AND vote = 1)`), "upvote_count"],
                    [ Sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post_id = post.id AND vote = -1)`), "downvote_count"],
                    
                    // WHAT IS HAPPENING BELOW ?
                    // we need to get the user_vote only if the user is making a Authenthicated request i.e userId is present ( token is being sent )
                    // we write a ternary ... that returns AND SPREADS two arrays conditionally... one if TRUE ..other empty array if FALSE
                    ...( userId
                        ? [ [ Sequelize.literal(`(SELECT vote FROM vote WHERE user_id = "${userId}" AND post_id = post.id)`), "user_vote"] ]
                        : []
                    )
                ],
                exclude : ["user_id"] 
            },
            include : [
                {
                    model : User,
                    as : "user"
                },
                {
                    model : User,
                    as : "tagged_user",
                    attributes : ["id", "username"]
                },
            ]
        });

        res.status(201).json(post);

    } catch (error) {
        if( error.name == 'SequelizeForeignKeyConstraintError'){
            return res.status(400).json({ message : "No topic found with such ID"})
        }
        console.log(error);
        res.status(500).json( {message : "Something went wrong"})
    }
}

// don't get scared by the below syntax, Its just a function returning another function.
// REASON : to generalise our addPostValue controller for both upvoting and downvoting we need to add a pramater "vote"
// "vote" is mentioned in the controller function passed in the routing file
// but all controllers require the (req, res) signature. So (vote, req, res) wont make sense
// our controller takes in vote as the argument and returns another controller with the "normal" (req, res) as the arguments

exports.addPostVote = (vote) => async (req, res) => {
    let postId = req.params.id;
    let { id : userId } = res.locals.user;

    try {
        let newVote = await Vote.create( { post_id : postId, user_id : userId, vote : vote } );

        // if the vote already exists in the Vote Table then a "ER_DUP_ENTRY" error will occur here
        // this is dealt with in the catch block

        if(newVote)
            return res.sendStatus(204);
        else
            return res.sendStatus(424); // in case creation was not successful

    } catch (error) {
        // if there is already a vote present in the DB for given post_id and user_id ... we simply update the "vote" attribute
        if( error?.original?.code === "ER_DUP_ENTRY"){
            let [updatedCount] = await Vote.update( { vote : vote },{
                where : {
                    post_id : postId,
                    user_id : userId
                }
            });

            if(updatedCount)
                return res.sendStatus(204);
            else
                return res.sendStatus(424);
        }
        else if( error.name == 'SequelizeForeignKeyConstraintError'){
            return res.status(400).json({ message : "No post found with such ID"})
        }

        console.log(error);
        res.status(500).json( { message : "Something went wrong."} );    
    }
}


exports.deletePostVote = (vote) => async (req, res) => {
    let postId = req.params.id;
    let { id : userId } = res.locals.user;

    try {
        let isDeleted = await Vote.destroy({
            where : {
                post_id : postId,
                user_id : userId,
                vote : vote
            }
        });


        if(isDeleted)
            return res.sendStatus(204);
        else
            return res.sendStatus(424); // in case there was no deletion

    } catch (error) {
        console.log(error);
        res.status(500).json( { message : "Something went wrong."} );   
    }
}

