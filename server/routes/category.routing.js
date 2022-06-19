const express = require("express")
const router = express.Router()

const categoryController = require("../controllers/category.controller.js")

router.get("/", categoryController.getAllCategories );
router.get("/:id", categoryController.getCategory);
router.get("/:id/topics", categoryController.getCategoryTopics);


module.exports = router