require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const auth = require("./config/auth");
const authRouter =require("./routes/authRoutes")
const blogRouter = require("./routes/blogRoutes")
const cors = require("cors")
const passport = require("passport")
require("./config/passport")
const blogModel = require("./models/blogModel")
const morgan = require("morgan") 
const ErrorHandler = require("./middleware/errorHandler")



const PORT = process.env.PORT || 3336

const app = express()
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan("tiny"))//logs requests for debugging
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


app.use('/',  authRouter)
app.use('/blogs',auth,blogRouter)
app.get('/published',async (req,res)=>{


    try{
        const Limit = req.body.limit || 5
    const Skip = req.body.skip || 0
    const blogs = await blogModel.find({state:"published"},{body:0}).limit(Limit).skip(Skip)
    //const blogs = await blogModel.find({state:"published"}).limit(Limit).skip(Skip).projection({title:1,tags:1,author:1})
    return res.json({ status: true,
        message:" published blogs retrieved successfully",
         blogs })
    }catch(err){
      console.log(err)
    }
    
    
})

app.get('/published/:id',async (req,res)=>{
    
    const blog_id = req.params.id
    
    const blog = await blogModel.findById(blog_id)//('6366c3428542eb10ca760de7')
    if(!blog){
       return res.send({
            success:false,
            message:`id:${blog_id} does not match any blog in our records`,
        
        })
    }
    if(blog.state==="draft"){
        return res.send({
            success:false,
            message:`user unauthorized to access this blog`,
        
        })

    }
    
     blog.read_count++
     await blog.save()

    return res.send({
        success:true,
        message:"requested blog retrieved successfully",
        blog:blog
    })
})
app.get('/protected',auth,(req,res)=>{//passport.authenticate("jwt",{session:false})
    res.send({
        success:true,
        user:{
            id:req.user._id,
            email:req.user.email
        }
    })
})
// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

//res.locals //check aggregate in mongodb
app.get('/res',auth, (req, res) => {
    console.log("res middleware works  "+req.user.user_id)
    return res.status(200).json(req.user.user_id)
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
