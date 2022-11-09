const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const moment = require("moment")
const bcrypt = require("bcrypt")

require('dotenv').config();


exports.signup = async (req,res)=>{
    try{
        const{email,password} = req.body

        if(!(email && password)){
            res.status(400).send("all fields are required")
        }

        if((typeof email) !== 'string'){
           res.json({status:'error',error:'invalid email'})
        }

        if((password.length < 6) ){
            res.json({status:'error',error:'password should be at least 6 characters'})
         }

        const oldUser  = await userModel.findOne({email})

        if(oldUser){
            return res.status(409).send("user already exists, login or try another username")
        }

        

        const user = userModel.create({
            created_at:moment().toDate(),
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email.toLowerCase(),
            password:await bcrypt.hash(req.body.password,10)
            })

         SECRET = process.env.SECRET

        const token =  jwt.sign({ email: user.email,user_id:user._id }, SECRET,{expiresIn:"1h"});

        user.token = token
        //console.log(user)
        

        res.status(201).json(user.token)
    }catch(err){
        console.log(err)
    }

}
exports.login = async (req,res)=>{

    try{
        const {email,password} = req.body
        if(!(email && password)){
            return res.status(409).send("all fields are required to proceed")
        }

        const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      // user
      
      res.status(200).json(user.token);

    }
    res.status(400).send("Invalid Credentials");
    }catch(err){
        console.log(err)
    }

}
