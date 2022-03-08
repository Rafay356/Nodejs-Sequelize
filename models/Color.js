const dbConfig = require("../dbconfig/config")
const {Sequelize, DataTypes, Op} = require("sequelize")
const {database,username,password,dialect} = dbConfig
const modelUser = require ("../models/User")

const sequelize = new Sequelize(database, username, password,{
    dialect : dialect,
    define : {
        timestamps : false}
    }) 
const Color = sequelize.define("colors",{
    id : {
        type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
    },
    color_name : {
        type: DataTypes.STRING,
    },
},
    {
        freezeTableName : true
    })
    modelUser.User.hasMany(Color,{foreignKey:"userId", as : "user"}) 

    sequelize.sync({alter:true}).then(()=>{
    }).catch((err)=>{
        console.log("err",err)

    })
    //     //const colorn = Color.build({color_name : "blue"})
    //     if(Color.color_name != Color.color_name){
            
    //         //return colorn.save()
            
            
    //     }else{
    //         console.log(" Not Entered")
    //     }

    // }).catch((err)=>{
    //     console.log(err,"Color NOt Entered")
    // })

// Color.sync({alter:true}).then(()=>{
//     return Color.findAll()
//     }).then((data)=>{
//     data.forEach((element)=>{
//         console.log(element.toJSON())
//     })
// }).catch((err)=>{
//     console.log(err)
// })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = {Color}


/* 
const Sequelize = require("sequelize")
const path = require("path")
const express = require("express")
const router = express.Router()
const {DataTypes, Op} = Sequelize
module.exports = (sequelize) =>{
        const Color = sequelize.define('color',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        color_name :{
            type : DataTypes.STRING
        },
        
    },{
        freezeTableName : true,
    })
    Color.sync({alter:true}).then(()=>{})
} */