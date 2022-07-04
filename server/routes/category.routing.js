const express = require("express")
const router = express.Router()

const categoryController = require("../controllers/category.controller.js");

const { compressAndStore } = require("../middlewares/imageProcessing.js");
const { uploadToMemory } = require("../middlewares/imageUpload.js");

router.get("/validate-name", categoryController.validateCategoryName);
router.get("/", categoryController.getAllCategories );
router.get("/:id", categoryController.getCategory);
router.post("/", uploadToMemory("thumbnail"), compressAndStore, categoryController.createCategory ); // thumbnail is the "key" with which the client sends the image file.
router.patch("/:id", uploadToMemory("thumbnail"), compressAndStore, categoryController.updateCategory );
router.delete("/:id", categoryController.deleteCategory);

// router.get("/:id/topics", categoryController.getCategoryTopics);


module.exports = router