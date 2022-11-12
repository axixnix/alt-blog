const express = require("express")
const blogRouter = express.Router()
const blogController =require("../controllers/blogController")








blogRouter.post("/create",blogController.createBlog)

blogRouter.delete("/delete/:id",blogController.deleteBlog)

blogRouter.post("/mine",blogController.getAllMyBlogs)

blogRouter.post("/publish/:id",blogController.publishBlog)

blogRouter.patch("/edit/:id",blogController.editBlog)

blogRouter.post("/published",blogController.getPublishedBlogs)

blogRouter.get("/published/:id",blogController.getAPublishedBlog)






module.exports =blogRouter