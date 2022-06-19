const express = require("express");

const postController = require("../controllers/post.controller.js");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);
router.get("/:id", postController.getPost);
router.post("/:id/upvote", postController.addPostVote(true));
router.delete("/:id/upvote", postController.deletePostVote(true));
router.post("/:id/downvote", postController.addPostVote(false));
router.delete("/:id/downvote", postController.deletePostVote(false));


module.exports = router;