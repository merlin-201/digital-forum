const express = require('express')

const userController = require("../controllers/user.controller.js")

const router = express.Router()

router.get("/", userController.getAllUsers);
router.get("/search", userController.searchUser);
router.get("/:id", userController.getUser);

module.exports = router