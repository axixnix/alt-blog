function ErrorHandler(Error,req,res,next){
   res.status(Error.status||500)
   res.send({error:true,
message:Error.message||"internal server error"})
}

module.exports =ErrorHandler