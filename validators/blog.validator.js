const Joi = require("joi")

const BlogSchema = Joi.object({
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

    author: Joi.string()
               .min(2) 
               .trim() 
               .required(),          
    

    body: Joi.string()
             .min(10)
             .required(),

    reading_time: Joi.string()
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