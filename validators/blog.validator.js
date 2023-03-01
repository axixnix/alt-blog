const Joi = require("joi")

const BlogAddSchema = Joi.object({
    title: Joi.string()
              .min(5)
              .max(255)
              .trim()
              .required(),

    description: Joi.string()
                    .min(5)
                    .max(500)
                    .trim()
                    .required(),
   
    tags:       Joi.array().items(Joi.string().trim())
                
                .optional(),
                
    created_at : Joi.date()
                .default(Date.now),

    last_updated : Joi.date()
                .default(Date.now),            

             
    

    body: Joi.string()
             .min(10)
             .required(),

    reading_time: Joi.number()
    .integer()
    .min(1)
    .max(60)
    .required()         
             

})

const BlogUpdateSchema = Joi.object({
    title: Joi.string()
              .min(5)
              .max(255)
              .trim()
              ,

    description: Joi.string()
                    .min(5)
                    .max(500)
                    .trim()
                    ,
   
    tags:       Joi.array().items(Joi.string().trim())
                
                .optional(),
                
    created_at : Joi.date()
                .default(Date.now),

    last_updated : Joi.date()
                .default(Date.now),            

             
    

    body: Joi.string()
             .min(10)
             ,

    reading_time: Joi.number()
    .integer()
    .min(1)
    .max(60)
             
             

})

const StateUpdateSchema = Joi.object({
    state: Joi.string().valid("published","draft")//enum values
              
            
             
             

})


async function AddBlogValidationMW(req,res,next){
    const blogPayload =req.body

    try {
        await BlogAddSchema.validateAsync(blogPayload)
        next()
        
    } catch (error) {
        next({message:error.details[0].message,
        status:400})
        
    }
}

async function UpdateBlogValidationMW(req,res,next){
    const blogPayload =req.body

    try {
        await BlogUpdateSchema.validateAsync(blogPayload)
        next()
        
    } catch (error) {
        next({message:error.details[0].message,
        status:400})
        
    }
}

async function StateValidationMW(req,res,next){
    const blogPayload =req.body

    try {
        await StateUpdateSchema.validateAsync(blogPayload)
        next()
        
    } catch (error) {
        next({message:error.details[0].message,
        status:400})
        
    }
}



module.exports = {AddBlogValidationMW,UpdateBlogValidationMW,StateValidationMW}