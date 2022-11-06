const express = require("express")
const blogRouter = express.Router()
const blogController =require("../controllers/blogController")








blogRouter.post("/create",blogController.createBlog)
blogRouter.get("/published",blogController.getAPublishedBlog)






module.exports =blogRouter