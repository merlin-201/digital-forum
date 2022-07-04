const express = require("express");

const topicController = require("../controllers/topic.controller.js");
const { compressAndStore } = require("../middlewares/imageProcessing.js");
const { uploadToMemory } = require("../middlewares/imageUpload.js");
const postController = require("../controllers/post.controller.js");
const { requireAuth } = require("../middlewares/auth.js");

const router = express.Router();


router.get("/", topicController.getAllTopics );
// router.get("/search", topicController.searchTopic );
router.get("/validate-name", topicController.validateTopicName);
router.get("/:id", topicController.getTopic );
router.post("/", uploadToMemory("thumbnail"), compressAndStore, topicController.createTopic );
router.patch("/:id", uploadToMemory("thumbnail"), compressAndStore, topicController.updateTopic );
router.delete("/:id", topicController.deleteTopic );
router.get("/:id/posts", requireAuth(optional = true), postController.getPostsByTopic);

module.exports = router;