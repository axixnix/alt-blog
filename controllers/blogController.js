const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel');
const moment = require("moment");
const  mongoose =require("mongoose")
//const { find } = require('../models/blogModel');


exports.createBlog = async (req,res)=>{
    const {user }= await UserModel.findOne({_id:req.user.user_id})
    const blog = await  BlogModel.create({
       creator_id:req.user.user_id,
        created_at:moment().toDate(),
        title:req.body.title,
        description:req.body.description,
        tags:req.body.tags,
        author:user.first_name+" "+user.last_name,
        state:"draft",
        read_count:0,
        reading_time:`this is a ${req.body.reading_time} minute read`,
        body:req.body.body
    }).then(blog=>{
        res.send({
            success:true,
            message:"blog created successfully",
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

   try{
    const Limit = req.body.limit || 20
    const Skip = req.body.skip || 0
    
        const published = await BlogModel.find({state:"published"},{body:0}).limit(Limit).skip(Skip)
        res.send({
            success:true,
            message:" published blogs retrieved successfully",
            blog:published
        })
   }catch(err){
    res.send({
        success:false,
        message:" published blogs not retrieved successfully",
        error:err
    })
   }
    
}

exports.getAllMyBlogs = async (req,res)=>{
    //const state = "pulished"//String(req.params)
    
    
    
        const user_id = req.user.user_id
        const {state} =req.body
        console.log("this is user: "+user_id)
        const Limit = req.body.limit|| 20
        const skip = req.body.skip || 0
        console.log("this is state  "+state)

        switch(state){
            case "published"||"draft": const stated = await BlogModel.find({creator_id:user_id}).where("state").equals(state)
            console.log(stated)
             res.status(200).send({message:`here are your ${state} blogs `,blogs:stated})
            break;
            case {}: const unstated =await BlogModel.find({})
            console.log(unstated)
             res.status(200).send({message:`here are your  blogs `,blogs:unstated})
            break;
            default: return res.status(400).send({success:false,message:"error encountered could not retrieve your blogs"})
        }
         
        
            
        }
            
            
      
        
    




//exports.testRes = async (req,res)=>{
//console.log(res.locals.userId)
//}

exports.publishBlog = async (req,res)=>{
    try{
        const id=req.params.id
        const user_id = req.user.user_id
        const blog = await BlogModel.findOne({_id:id})
        if(!blog){
            return res.send({
                status:false,
                message:"id does not any blog in our records"
            })
        }
        const b_id =String(blog.creator_id)
        const u_id = String(user_id)
        if(!(u_id==b_id)){
            return res.send({status:false,
            message:"you are not authorized to perform this action"})
        }
        if(blog.state=="published"){
          return res.sen({status:false,message:"blog already published"})
        }

        blog.state ="published"
        await blog.save()
        return res.send({status:true,message:"blog publishing successful"})

    }catch(err){
      res.send({sucess:false,
    message:"unable to publish blog",
    error:err
    })

}}

exports.getAPublishedBlog = async (req,res)=>{
    try{
        const blog_id = req.params.id
    
    const blog = await BlogModel.findById(blog_id)//('6366c3428542eb10ca760de7')
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
    }catch(err){
        res.send({status:false,
            message:"encountered an error",
        error:err})
    }
    
}




exports.deleteBlog = async (req, res) => {
    const  id  = req.params.id
    const user_id = req.user_id
    check = await BlogModel.findById(id)
    console.log(check)
    if(!check){
        return res.send({
            success:false,
            message:`id:${blog_id} does not match any blog in our records`,
        
        })
    }
    
    const creator_id = check.creator_id
    console.log(creator_id==user_id)
    console.log("blog id from request  "+id)
    if(check && (creator_id==user_id)){
    const blog = await BlogModel.deleteOne({ _id: id})
    return res.json({ status: true, message:"blog has been deleted",blog:blog })
    }
    if(check &&  !((check.creator_id===user_id))){
        
        return res.json({ status: false, message:"unauthorized" })
        }
    
}


exports.editBlog = async (req, res) => {
    const { id } = req.params;
    const options ={body:"",title:"",description:"",tags:""}
    //const { state } = req.body;

    const blog = await BlogModel.findById(id)

    if (!blog) {
        return res.status(404).json({ status: false, message:"id does not match any blog in our  records" })
    }

    if (!(req.body.body=="")) {
        blog.body =req.body.body
        //await blog.save()
       // return res.send({status:true,message})
    }
    
    if(!(req.body.tags =="")){
        blog.tags = req.body.tags
    }

    if(!(req.body.title =="")){
        blog.title = req.body.title
    }

    if(!(req.body.description =="")){
        blog.description = req.body.description
    }
    

    

    await blog.save()

    return res.json({ status: true, message:"blog edited successfully" })
}