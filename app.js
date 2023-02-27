const express = require("express")
const bodyParser = require("body-parser")
const CONFIG = require("./config/config")
const connectToDb = require("./db/mongodb")

const app = express()

//Routes
const blogRouter = require("./routes/blogRouter")

//Connect to mongodb
connectToDb()


//Add Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/blogs",blogRouter)

app.get('/',(req,res)=>{
    res.send('hello blog')
})

//Error handler middleware
app.use((err,req,res,next)=>{
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})


app.listen(CONFIG.PORT,()=>{
    console.log(`server started on http://localhost:${CONFIG.PORT}`)
})