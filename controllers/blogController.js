const BlogModel = require('../models/blogModel');
const moment = require("moment");
//const { find } = require('../models/blogModel');


exports.createBlog = async (req,res)=>{
    console.log(req.body.u_id)
    const blog = await  BlogModel.create({
       creator_id:req.body.u_id,
        created_at:moment().toDate(),
        title:req.body.title,
        description:req.body.description,
        tags:req.body.tags,
        author:req.user.first_name+" "+req.user.last_name,
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
    async (req,res)=>{
        const published = await blogModel.find({state:"published"},{body:0})
        res.send({
            success:true,
            message:" published blogs retrieved successfully",
            blog:published
        })
    }
}

exports.getAllMyBlogs = async (req,res)=>{
    try{
        const state = req.params.id
        const user_id = req.body.id
        const Limit = req.body.limit|| 20
        const skip = req.body.skip || 0
        if(state==1){
            const blogs= await BlogModel.find({creator_id:user_id},{state:"published"}).limit(Limit).skip(skip)
        return res.send({status:true,
            message:"these are your published blogs",
            blogs})
        }

        if(state==2){
            const blogs= await BlogModel.find({creator_id:user_id},{state:"draft"}).limit(Limit).skip(skip)
        return res.send({status:true,
            message:"these are your blog drafts",blogs})
        }

        if(state==0){
            const blogs= await BlogModel.find({creator_id:user_id}).limit(Limit).skip(skip)
        return res.send({status:true,
            message:"these are all your blogs",
            blogs})
        }

        if((state!=0)||(state!=1)||(state!=2)){
        
        return res.send({status:false,
            message:"undefined state requested, check state parameter"
            })
        }
        

    }
    catch(err){
       return res.send({status:false,
        message:"encountered error while attempting to retrieve your blogs",
    error:err})
    }
}

exports.getAPublishedBlog = async (req,res)=>{

}

exports.publishBlog = async (req,res)=>{
    try{
        const {id}=req.params
        const user_id = req.user._id
        const blog = await BlogModel.findOne({creator_id:user_id})
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

    }

}


exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id
    const u_id=String(user_id)
    check = await BlogModel.findById(id)
    if(!check){
        return res.send({
            success:false,
            message:`id:${blog_id} does not match any blog in our records`,
        
        })
    }
    
    const b_id = String(check.creator_id)
    console.log(b_id==u_id)
    if(check && (b_id==u_id)){
    const order = await BlogModel.deleteOne({ _id: id})
    return res.json({ status: true, message:"blog has been deleted" })
    }
    if(check &&  !((check.creator_id===user_id))){
        
        return res.json({ status: false, message:"unauthorized attempt to delete" })
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