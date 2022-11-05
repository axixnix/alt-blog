const express = require("express")
const blogRouter = express.Router()
const blogController =require("../controllers/blogController")








blogRouter.post("/create",blogController.createBlog)







module.exports =blogRouter