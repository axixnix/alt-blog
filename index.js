require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const auth = require("./config/auth");
const authRouter =require("./routes/authRoutes")
const blogRouter = require("./routes/blogRoutes")
const cors = require("cors")
const morgan = require("morgan") 
const ErrorHandler = require("./middleware/errorHandler")
const passport = require("passport");
//const verifyToken = require("./config/auth");
require("./config/passport")





const PORT = process.env.PORT || 3336

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan("tiny"))//logs requests for debugging
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use(passport.initialize())


app.use('/',  authRouter)
app.use('/blogs',auth,blogRouter)
// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

//res.locals //check aggregate in mongodb
app.get('/res',auth, (req, res) => {
    console.log("res middleware works  "+req.user.id)
    return res.status(200).json(req.user.id)
   // console.log(req.body)
   // console.log({lel:req.user._id})
})


// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

app.use(ErrorHandler)//position matters, place after routes

//db connection
mongoose.connect("mongodb://localhost:27017/blog3")//process.env.MONGO_URL
mongoose.connection.on("connected",()=>{
  console.log("mongodb connection successful")
})
mongoose.connection.on("error",(err)=>{
    console.log("connection to mongodb not successful")
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`listening on port:${PORT}`)
})
