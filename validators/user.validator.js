const UserAddSchema = Joi.object({
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
async function CreateUserValidationMW(req,res,next){
    const blogPayload =req.body

    try {
        await UserAddSchema.validateAsync(blogPayload)
        next()
        
    } catch (error) {
        next({message:error.details[0].message,
        status:400})
        
    }
}



module.exports = {CreateUserValidationMW}