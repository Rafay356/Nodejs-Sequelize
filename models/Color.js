const dbConfig = require("../dbconfig/config")
const {Sequelize, DataTypes, Op} = require("sequelize")
const {database,username,password,dialect} = dbConfig
const modelUser = require ("../models/User")

const sequelize = new Sequelize(database, username, password,{
    dialect : dialect,
    define : {
        timestamps : true}
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
     modelUser.User.hasMany(Color,{foreignKey:"userId"}) 
     Color.belongsTo(modelUser.User)
    // Color.belongsTo(modelUser.User)
    
    
    sequelize.sync({alter:true}).then(()=>{
      const arr  = [1,1,2,2,2,3,3,3,3,4,5,2,7,3,2]
      let dublicate  =  arr.filter((n,index)=>{
        //console.log("arrin",arr.indexOf(n))
          return arr.indexOf(n) === index
          
      })
      console.log(dublicate)
      const counts = {};
      let max = []; 
      let min =[]
      arr.forEach((x) => {
          counts[x] = (counts[x] || 0) + 1;
         
          
        });

        // for (var value in counts) {
        //     if (counts.hasOwnProperty(key)) {
        //       counts[key] > 1 ? max++ : max;
        //     }
        //   }
        
          //console.log(max)
        console.log(Object.entries(counts))
    
        for(var key of Object.entries(counts))
        {
            

          if(Object.values(counts)>max)
        
          //key.slice(1)
          
          {
                max = key
                //max.push(...key)
        
          }
          
        }
         console.log("max",max)

        for(var key of Object.entries(counts))
        {
          if(Object.values(counts)<min)
          {
             key =min
          }
        }
        console.log(key)


         
    }).catch((err)=>{
        console.log("err",err)

    })
    
    // //     //const colorn = Color.build({color_name : "blue"})
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