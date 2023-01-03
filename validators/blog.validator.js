const joi = require("joi")

const BlogSchema = Joi.object({
    title: joi.string()
              .min(5)
              .max(255)
              .trim()
              .required(),

    description: joi.string()
                    .min(5)
                    .max(500)
                    .trim()
                    .required(),
   
    tags:       joi.array().items(joi.string())
                .trim()
                .optional(),
                
    created_at : joi.date()
                .default(Date.now),

    last_updated : joi.date()
                .default(Date.now),            

    author: joi.string()
               .min(2) 
               .trim() 
               .required(),          
    

    body: joi.string()
             .min(10)
             .required(),

    reading_time: joi.string()
             .min(10)
             .required()         
             

})

async function BlogValidation(req,res,next){
    const blogPayload =req.body

    try {
        await BlogSchema.validateAsync(blogPayload)
        next()
        
    } catch (error) {
        next(error.details[0].message)
        
    }
}


module.exports = BlogValidation