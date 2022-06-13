const express = require("express")
const router = express.Router()

const postController = require("../controllers/post")

router
    .route("/getAllPost")
    .post(postController.getAllPost)

router
    .route("/addPost")
    .post(postController.addPost)

router
    .route("/updateUpVote")
    .post(postController.updateUpVote)

    router
    .route("/updateDownVote")
    .post(postController.updateDownVote)


module.exports = router