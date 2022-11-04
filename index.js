const express = require("express")
const mongoose = require("mongoose")
const authRouter =require("./routes/authRoutes")
//const passport = require("passport")
const cors = require("cors")
//require("./passport")



const PORT = 3336

const app = express()
//app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


app.use('/',  authRouter)
// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})






//db connection
mongoose.connect("mongodb://127.0.0.1:27017/blog3")
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
