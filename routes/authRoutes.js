const express = require("express")
const authRouter = express.Router()
const authController =require("../controllers/authController")
const authController2 =require("../controllers/authController2")








authRouter.post("/signup",authController.signup)

authRouter.post("/login",authController.login)











module.exports = authRouter