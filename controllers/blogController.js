const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel.js');
const moment = require("moment");
const  mongoose =require("mongoose")
 
//const { find } = require('../models/blogModel');


exports.createBlog = async (req,res)=>{
    /*const user = await UserModel.findOne({_id:req.user.email}).then(data=>{
                
        count = data.length
        return data
    })*/
    const count =1
    if(count==0||undefined){
        
        return res.status(400).send({message:"this action can only be performed by registered users"})}
    console.log("blog creator user count "+count)
        const blog = await  BlogModel.create({
       creator_id:1,//user._id,
        created_at:moment().toDate(),
        title:req.body.title,
        description:req.body.description,
        tags:req.body.tags,
        author:"first author",//req.body.author,//user.first_name+" "+user.last_name,
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
    
        const published = await BlogModel.find({state:"draft"},{body:0}).limit(Limit).skip(Skip)
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

exports.getMyBlogs = async (req, res) =>{
	try {
		const user_id = req.user.id;
		const { state } = req.query;
        let count1
        let count2

		if (state) {
            
			const blogs = await BlogModel.find({ state:state, creator_id: user_id },{body:0}).then(data=>{
                
                count1 = data.length
                return data
            });
            //console.log('blogs length     '+blogs)
            console.log('blogs length     '+count1)
            if(count1==0){return res.status(422).send({message:`you have no blogs in ${state} state`})}
			return res.status(200).json({ status: true, blogs});
		}

		const blogs = await BlogModel.find({ creator_id: user_id },{body:0}).then(data=>{
                
            count2 = data.length
            return data
        });
        if(count2==0){return res.status(422).send({message:`you have 0 blogs in record `})}
		return res.status(200).json({ status: true, blogs });

        
	} catch (err) {
		res.send({ status: 500, errDesc: err, message: "An error occurred, please try again." });
	}
}


//exports.testRes = async (req,res)=>{
//console.log(res.locals.userId)
//}

exports.updateState = async function publish(req, res) {
	try {
		const { blog_id } = req.params;
		const user_id = req.user.id;
		const body = req.body;
		const blog = await BlogModel.findById(blog_id,{body:0});

		if (!blog) {
			return res.status(404).json({ status: false, message: `Can not find blog with ID: ${blog_id}` });
		}

		if (user_id !== blog.creator_id) {
			return res.status(401).json({ status: false, message: "You are not authorized to edit this blog." });
		}
        if(body.state=="draft"||"published"){
		blog.state = body.state;
		blog
			.save()
			.then(() => res.status(200).json({ status: true, blog }))
			.catch((err) => next({ status: 500, errDesc: err, message: err._message }));}else{
                return res.status(422).send({
                    message:"invalid state"
                })
            }
	} catch (err) {
		res.send({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
	}
}


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
    //const id = mongoose.Types.ObjectId(req.params.id.trim())
    //const  id  = String(req.params.id)
    const id =(req.params.id).trim()
    console.log("type of req.params.id : "+typeof req.params.id)
    console.log(" req.params.id : "+ req.params.id)

    const user_id = req.user.id
    check = await BlogModel.findById({_id:id})/* , function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
    });
    console.log(check)
    if(!check){
        return res.send({
            success:false,
            message:`id:${id} does not match any blog in our records`,
        
        })
    }
     */
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


exports.editBlog = async function updateArticle(req, res) {
	try {console.log("req.params.id :"+(req.params.blog_id))
		const  blog_id  = req.params.blog_id;
        console.log("blog_id :"+blog_id)
		const user_id = req.user.id;
		const { title, description, body, state, tags } = req.body;
		const blog = await BlogModel.findById(blog_id);

		if (!blog) {
			return res.status(404).json({ status: false, message: `Can not find blog with ID: ${blog_id}` });
		}

		if (user_id !== blog.creator_id) {
			return res.status(401).json({ status: false, message: "You are not authorized to edit this blog." });
		}
        //console.log("state frome destructuring :"+state)
        if(!(title==undefined))
		blog.title = title;
        if(!(description==undefined))
		blog.description = description;
        if(!(body==undefined))
		blog.body = body;
        if(!(state==undefined))
		blog.state = state;
        if(!(tags==undefined))
		blog.tags = tags;
        

		blog.last_updated = moment().toDate();

		blog
			.save()
			.then(() => res.status(200).json({ status: true, blog }))
			.catch((err) => res.send({ status: 500, errDesc: err, message: err._message }));
	} catch (err) {console.log(err)
		res.json({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
	}
}

exports.userGetOne = async (req, res) => {
    //const  blog_id  = (req.params.blog_id).trim()
    const  blog_id = new mongoose.Types.ObjectId(req.params.blog_id)
    console.log("this is blog_id : "+blog_id)
    console.log("this is typeof blog_id : "+ typeof blog_id)
    const user_id = req.user.id
    let check
    /* blog = await BlogModel.findById(blog_id).then(data=>{
        check = data.length
        console.log("data length : "+data.length)

        return data
    }) */
    const blog = await BlogModel.findById(blog_id).then(data=>{
        check = data.length//data.length()
        console.log("this is data : "+data)
        console.log("this is check : "+check)
        return data
    });
    console.log(blog)
    if(!(blog)){
        return res.send({
            success:false,
            message:`id:${blog_id} does not match any blog in our records`,
        
        })
    }
    
    const creator_id = blog.creator_id
    if( (creator_id==user_id)){//check && (creator_id==user_id)){
    
    return res.json({ status: true, message:"found your blog",blog:blog })
    }
    if(  !((check.creator_id===user_id))){//check &&  !((check.creator_id===user_id))){
        
        return res.json({ status: false, message:"unauthorized" })
        }
    
}