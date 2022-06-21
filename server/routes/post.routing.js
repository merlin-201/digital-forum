const express = require("express");

const postController = require("../controllers/post.controller.js");

const { requireAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.post("/", requireAuth, postController.createPost);
router.get("/:id", postController.getPost);
router.post("/:id/upvote", requireAuth(), postController.addPostVote(1));
router.delete("/:id/upvote", requireAuth(), postController.deletePostVote(1));
router.post("/:id/downvote", requireAuth(), postController.addPostVote(-1));
router.delete("/:id/downvote", requireAuth(), postController.deletePostVote(-1));

module.exports = router;