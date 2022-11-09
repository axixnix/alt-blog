const express = require("express")
const blogRouter = express.Router()
const blogController =require("../controllers/blogController")








blogRouter.post("/create",blogController.createBlog)

blogRouter.delete("/:id",blogController.deleteBlog)

blogRouter.post("/mine/:id",blogController.getAllMyBlogs)

blogRouter.post("/publish/:id",blogController.publishBlog)

blogRouter.patch("/edit/:id",blogController.editBlog)

//blogRouter.get("/published",blogController.getAPublishedBlog)






module.exports =blogRouter