const mongoose =require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    id: ObjectId,
    creator_id:{type:String},
    created_at:Date,
    title:{type:String,required:true},
    description:{type:String,required:true},
    tags:{type:String},
    author:{type:String,required:true},
state:{ type: String, enum:['published','draft'] ,required:true,default:"draft"},
    read_count:{type:Number,default:0},
    reading_time:{type:String},
    body:{type:String,required:true}

})

const Blog = mongoose.model("Blog",blogSchema)

module.exports =Blog