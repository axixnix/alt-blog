
const jwt =require("jsonwebtoken")
function verifyToken(req,res,next){
    const bearerHeader =req.headers['authorization']
    if(typeof bearerHeader !== "undefined"){
        const bearer= bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token =bearerToken
        jwt.verify(bearerToken,process.env.JWT_SECRET,(err,authData)=>{
            if(err){res.sendStatus(403)}else{
                req.user = authData
                res.json({message:"authenticated"})
            }
        })
        next()

    }else{
        //forbidden
        res.sendStatus(403)
    }
}