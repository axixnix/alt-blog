const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const moment = require("moment")
const bcrypt = require("bcrypt")

require('dotenv').config();

exports.signup = async(req,res)=>{
    const user = new UserModel({
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
     UserModel.findOne({email:req.body.email.toLowerCase()}).then(user=>{
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
            token:"Bearer " + token
        })


     })

}