const express = require('express')

const userAuthController = require("../controllers/userAuth.controller.js")

const router = express.Router()

router.post("/signup", userAuthController.signup);
router.post("/verify", userAuthController.verify);
router.post("/login", userAuthController.login);

module.exports = router