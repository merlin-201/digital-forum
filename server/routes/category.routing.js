const express = require("express")
const router = express.Router()

const categoryController = require("../controllers/category")
const subCategoryController = require("../controllers/subCategory")

router
    .route("/getCategory")
    .get(categoryController.getCategory)

router
    .route("/getSubCategory")
    .post(subCategoryController.getSubCategory)



module.exports = router