const mysql = require("mysql");
const { queryAsync } = require("../services/database");

exports.getPostUpvotesAndDownvotes = async (post) => {
    let q = "SELECT user_id, vote FROM post_vote_mapping WHERE post_id = ?";
    q = mysql.format(q, [post.id]);

    let voteResults = await queryAsync(q);

    let upvotes = [], downvotes = [];

    for(let row of voteResults){
        if(row.vote === 1)
            upvotes.push(row.user_id);
        else
            downvotes.push(row.user_id);
    }

    return {...post, upvotes, downvotes};
}