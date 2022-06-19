const express = require("express");

/* --------------------------------- routers -------------------------------- */
const authRouter = require("./auth.routing.js");
const categoryRouter = require("./category.routing.js");
const topicRouter = require("./topic.routing.js");
const postRouter = require("./post.routing.js");

const router = express.Router()

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/topics", topicRouter);
router.use("/posts", postRouter)

module.exports = router;