const modelColor = require("../models/Color")
const modelUser = require("../models/User")
const express = require("express");
const app = express()
app.use(express.json())

const getColor = async (req,res)=>{
   const color= await modelColor.Color.findAll({ include: modelUser.User})
    console.log((await modelColor.Color.findAll({ include: modelUser.User})))
    res.send(color)
}


const newColor = async (req, res, next) => {
const user = await modelUser.User.findOne({where:{username:req.body.username}})

   // console.log("req user ",req.body.username)
        const un = {
            userId : user.id,
            color_name:req.body.color_name

    
    }
    modelColor.Color.create(un).then(() =>{
        res.status(400).json({
            message : "Color Entered",
            color:un
        })
    }).catch((re)=>{
        res.status(404).json({
            message : "not Entered",
            re
        })
    })
};



module.exports = {newColor, getColor};