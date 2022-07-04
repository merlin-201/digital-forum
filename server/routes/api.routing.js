const express = require("express");

/* --------------------------------- routers -------------------------------- */
const userRouter = require("./user.routing.js");
const userAuthRouter = require("./userAuth.routing.js");
const categoryRouter = require("./category.routing.js");
const topicRouter = require("./topic.routing.js");
const postRouter = require("./post.routing.js");
const advertisementRouter = require("./advertisement.routing.js");
const auditTrailsRouter = require("./auditTrails.routing.js");
const cronLogsRouter = require("./cronLogs.routing.js");

const router = express.Router()

router.use("/auth", userAuthRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/topics", topicRouter);
router.use("/posts", postRouter);
router.use("/advertisements", advertisementRouter);
router.use("/audit-trails", auditTrailsRouter);
router.use("/cron-logs", cronLogsRouter);

module.exports = router;