const modelColor = require("../models/Color")
const modelUser = require("../models/User")
const express = require("express");
const app = express()
app.use(express.json())

const getColor = async (req,res)=>{
   const color= await modelColor.Color.findAll({ include: [
    {
        model : modelUser.User,
        attributes: ['first_name','last_name','username','email']
    }
     

]})
if(color == null) return res.status(400).send("No Color Added Yet")
    res.send(color)
}


const newColor = async (req, res, next) => {
const user = await modelUser.User.findOne({where:{username:req.body.username}})
if(!user) return res.status(404).send("user not found")


   // console.log("req user ",req.body.username)
        const un = {
            userId : user.id,
            color_name:req.body.color_name

    
    }
    modelColor.Color.create(un).then(() =>{
        res.status(200).json({
            message : "Color Entered",
            color:un
        })
    }).catch((re)=>{
        res.status(404).json({
            message : "Not Entered",
            re
        })
    })
};

const colorUpdate = async (req,res)=>{
   
    const cn = {
        color_name : req.body.color_name,
    
    }
    // console.log("req body",un)
    const id = req.params.id
    // console.log(id)
    const updateColor = await modelColor.Color.update(cn,{where: {id:id}})
    if(updateColor) return res.status(200).json({
        id : id,
        User_Updated : cn
    })
    //console.log(updateUser)

}





module.exports = {newColor, getColor, colorUpdate};