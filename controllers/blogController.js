const BlogModel = require('../models/blogModel');
const moment = require("moment")


exports.createBlog = async (req,res)=>{
    
    const user = await BlogModel.create({

        created_at:moment().toDate(),
        title:req.body.title,
        description:req.body.description,
        tags:req.body.tags,
        author:req.user.first_name+" "+req.user.last_name,
        state:"draft",
        read_count:0,
        reading_time:`this is a ${req.body.reading_time} minute read`,
        body:req.body.body
    })

    user.save().then(blog=>{
        res.send({
            success:true,
            message:"blog created successfuly",
            blog:blog
        })
    }).catch(err=>{
        res.send({
            success:false,
            message:"failed to create blog",
            error:err
        })

    })


}

exports.getPublishedBlogs = async (req,res)=>{

}

exports.getUserBlogs = async (req,res)=>{
    
}

exports.getAPublishedBlog = async (req,res)=>{

}

exports.udateBlog = async (req,res)=>{

}