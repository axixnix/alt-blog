const express = require("express")
const blogRouter2 = express.Router()
const blogController =require("../controllers/blogController")















blogRouter2.get('/one/:id',blogController.getAPublishedBlog)






module.exports =blogRouter2