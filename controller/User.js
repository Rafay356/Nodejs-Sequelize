const express = require("express");
const app = express()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const modelUser = require("../models/User")
const verify = require("../validToken/tokenValid")
const Sequelize = require("sequelize")


app.use(express.json())
//Get All User Data
const getallUser = (req, res, next) => {
    
        modelUser.User.findAll().then((User)=>{
            res.json(User)})
}

// const getUser = (req,res)=>{
//     model
// }

//Get User By Id
const getuserId =  (req, res, next) => {
    const id = req.params.id
            modelUser.User.findByPk(id).then((data)=>{
                if(id<=data || id!=data){
                 res.status(200).json(data)
                }
                else{
                    res.status(404).send({message:"Id "+ id + " Not Found"})
                }
             })
}
//Get User by Name
const getuserName =  async (req, res, next) => {
    const user = req.params.name
    console.log("user",user)

    const User = await modelUser.User.findOne({where:{username:user}})
    if(!User) return res.status(404).send("UserName not Found")
        res.send(User)
    
    
    // console.log("req",req.params.user)
    //     const userName = await modelUser.User.findAll({where:{username:user}})
    //     console.log(userName)
    //     res.send(userName)
        //return res.status(200).send(userName)
        // if(!userName || userName == null) 
        // console.log(userName)
        // return res.status(404).send("user Not Found")
        
}


const newUser = async  (req,res,next)=>{
    const salt = await bcrypt.genSalt()
    //store hash bcrypt.hash
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //new User
    //create userauth using model 
const userReg = new modelUser.User({
            id:req.body.id,
            password : hashPassword,
            email : req.body.email,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            username : req.body.username
        })
        //console.log("auth",auth)
        try {

         await userReg.save()
           

            res.status(200).json({
                
                savedUser: " Registered"
            })

        }
        catch (emailExist) {
            
            res.status(404).json({
                
                emailExist: userReg.email,
                emailExist
            })
        } 
}
    const userValid =  async (req,res, next) =>{
   
        const userEmail = await modelUser.User.findOne({where:{email:req.body.email}})
    //console.log(user)
        if(!userEmail) return res.send("Email doesnt exist")
      
        //comparing
    
            const validPass =  await bcrypt.compare(req.body.password,userEmail.password)
            //console.log("user password",user.password,"re body",req.body.password)
            //console.log("valid ", validPass)
            if(!validPass) return res.send("Invalid")
    
            // const token = jwt.sign({_id : userEmail._id}, "secret key")
            // res.header("auth_user", token).send(token)
            res.send("Login Success")
        
    }

    // const un = {
    //     id:req.body.id,
    //     first_name : req.body.first_name,
    //     last_name : req.body.last_name,
    //     username : req.body.username ,
    //     password : req.body.password,
    //     email : req.body.email
    
    // }
    // modelUser.User.create(un).then(() =>{
    //     res.status(400).json({
    //         message : "User Entered",
    //         user:un
    //     })
    // }).catch((re)=>{
    //     res.status(404).json({
    //         message : "not Entered",
    //         re
    //     })
    // })  

const userUpdate = async (req,res)=>{
   
    const un = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        username : req.body.username ,
        password : req.body.password,
        email : req.body.email
    
    }
    console.log("req body",un)
    const id = req.params.id
    console.log(id)
    const updateUser = await modelUser.User.update(un,{where: {id:id}})
    if(updateUser) return res.status(200).json({
        id : id,
        User_Updated : un
    })

    console.log(updateUser)

}

//     const userAll = await modelUser.User.findByPk(id)
//     console.log(userAll)
//     if(!userAll) return res.status(404).json({
//         message: "User not Found"
//     })
//     const updateUser = await modelUser.User.update(req.body,id)
//     console.log(updateUser)
//     await updateUser.save()
// }


module.exports = {
    newUser,
    userValid,
    //getUser,
    getallUser,
    getuserId,
    getuserName,
    userUpdate,
}