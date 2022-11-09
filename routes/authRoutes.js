const express = require("express")
const authRouter = express.Router()
const authController =require("../controllers/authController")
const authController2 =require("../controllers/authController2")








authRouter.post("/signup",authController2.signup)

authRouter.post("/login",authController2.login)











module.exports = authRouter