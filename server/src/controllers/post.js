var pool = require("../db/connection");
const express = require("express")

const app = express()


exports.getAllPost = async (req, res) => {
    var {subCategoryId} = req.body
    try{
        var query = `SELECT * FROM post WHERE topic_id = ${subCategoryId}`
        var [result, _] = await pool.execute(query)
        console.log(result)
        res.send(result)
    }catch(error){
        res.send(error)
    }
}

exports.addPost = async (req, res) => {
    var {topicId, userId, post} = req.body
    try{
        var query =`INSERT INTO post(topic_id, user_id, text, num_of_replies, num_of_upvotes, num_of_downvotes) VALUES(${topicId}, ${userId}, '${post}', 0, 0, 0)`
        var [result, _] = await pool.execute(query)
        console.log(result)
        res.send(result)
    }catch(err){
        res.send(err)
    }
}

exports.updateUpVote = async (req, res) => {
    var {postId} = req.body
    try{
        var query =`UPDATE post SET num_of_upvotes = num_of_upvotes + 1 where id = ${postId}`
        var [result, _] = await pool.execute(query)
        console.log(result)
        res.send(result)
    }catch(e){
        res.send(e)
    }
}

exports.updateDownVote = async (req, res) => {
    var {postId} = req.body
    try{
        var query =`UPDATE post SET num_of_downvotes = num_of_downvotes + 1 where id = ${postId}`
        var [result, _] = await pool.execute(query)
        console.log(result)
        res.send(result)
    }catch(e){
        res.send(e)
    }
}
