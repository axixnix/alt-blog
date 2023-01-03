const express = require("express")
const bodyParser = require("body-parser")
const CONFIG = require("./config/config")
const connectToDb = require("./db/mongodb")

const app = express()

//Connect to mongodb
connectToDb()


//Add Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('hello blog')
})


app.listen(CONFIG.PORT,()=>{
    console.log(`server started on http://localhost:${CONFIG.PORT}`)
})