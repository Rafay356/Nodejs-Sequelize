const express = require("express");
const app = express()
const modelUser = require("../models/User")
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


const newUser = (req,res,next)=>{
    const un = {
        id:req.body.id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        username : req.body.username ,
        password : req.body.password,
        email : req.body.email
    
    }
    modelUser.User.create(un).then(() =>{
        res.status(400).json({
            message : "User Entered",
            user:un
        })
    }).catch((re)=>{
        res.status(404).json({
            message : "not Entered",
            re
        })
    })  
}         
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
    //getUser,
    getallUser,
    getuserId,
    getuserName,
    userUpdate,
}