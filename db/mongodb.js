const mongoose = require("mongoose")
const CONFIG = require("../config/config")

function connectToDb(){
    console.log(CONFIG.MONGO_URL)
    console.log(CONFIG.PORT)
    mongoose.connect(CONFIG.MONGO_URL)

    mongoose.connection.on("connected",()=>{
        console.log("mongodb connected successfuly")
    })

    mongoose.connection.on("error",(err)=>{
        console.log("an error occured")
        console.log(err)
    })
}

module.exports = connectToDb