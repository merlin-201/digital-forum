const express = require("express");

const topicController = require("../controllers/topic.controller.js");
const postController = require("../controllers/post.controller.js");

const router = express.Router();

router.get("/", topicController.getAllTopics);
router.get("/:id", topicController.getTopic);
router.get("/:id/posts", postController.getPostsByTopic);

module.exports = router;