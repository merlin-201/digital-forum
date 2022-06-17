const express = require("express");

/* --------------------------------- routers -------------------------------- */
const authRouter = require("./auth.routing.js");

const router = express.Router()

router.use("/auth", authRouter);

module.exports = router;