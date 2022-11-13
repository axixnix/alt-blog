const express = require("express")
const blogRouter = express.Router()
const blogController =require("../controllers/blogController")








blogRouter.post("/create",blogController.createBlog)//works

blogRouter.delete("/delete/:id",blogController.deleteBlog)//works

blogRouter.get("/getmyblogs",blogController.getMyBlogs)//works

blogRouter.patch("/publish/:blog_id",blogController.updateState)//works

blogRouter.put("/edit/:blog_id",blogController.editBlog)

blogRouter.post("/published",blogController.getPublishedBlogs)//works but is index.js

blogRouter.get("/published/:id",blogController.getAPublishedBlog)//works but its in the index.js






module.exports =blogRouter