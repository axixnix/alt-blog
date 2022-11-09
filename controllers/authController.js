const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const moment = require("moment")
const bcrypt = require("bcrypt")

require('dotenv').config();

exports.signup = async(req,res)=>{
     await UserModel.create({
    created_at:moment().toDate(),
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email.toLowerCase(),
    password:await bcrypt.hash(req.body.password,10)
    })
     
    user.save().then(user=>{
        res.send({
            success:true,
            message:"user created successfuly",
            user:{
                id:user._id,
                email:user.email
            }
        })
    }).catch(err=>{
        res.send({
            success:false,
            message:"failed to create user",
            error:err
        })

    })

}

exports.login = async(req,res)=>{
      await UserModel.findOne({email:req.body.email.toLowerCase()}).then(user=>{//"email"
        if(!user){
            return res.status(401).send({
                success:false,
                message:"could not find user"
            })

        }

        //const compare =
        //console.log(bcrypt.compare(req.body.password,user.password)) 
        /*const isValidPassword =  function(){
            
            const compare =  bcrypt.compareSync(req.body.password,user.password)
            console.log(compare)
            return compare
        }*/

        if(!bcrypt.compareSync(req.body.password,user.password)/*(bcrypt.compare(req.body.password,user.password))*/){
            return res.status(401).send({
                success:false,
                message:"incorrect password"
            })

        }
         //console.log( UserModel.findOne({email:req.body.email},{first_name:0},{last_name:0},{created_at:0}))
        const payload={
            email:user.email,
            id:user._id
        }
        
        const token =jwt.sign({
            payload:payload
          },process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).send({
            success:true,
            message:"logged in successfuly",
            //u_id:u_id,
            name: user.first_name+' '+user.last_name,
            token:"Bearer " + token
        })


     })

}

exports.login2 = (req, res, { err, user, info}) => {

    if (!user) {
        return res.json({ message: 'Username or password is incorrect'})
    }

    // req.login is provided by passport
    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: user._id, username: user.username };
            //You store the id and username in the payload of the JWT. 
            // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
            // DO NOT STORE PASSWORDS IN THE JWT!
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

            return res.status(200).json({ token });
        }
    );
}