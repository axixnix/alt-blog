const express = require("express")
const publishedRouter = express.Router()
const blogController =require("../controllers/blogController")









publishedRouter.get("/published",blogController.getPublishedBlogs)






module.exports =publishedRouter