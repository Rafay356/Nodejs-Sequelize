const dbConfig = require("../dbconfig/config") 
const {Sequelize, DataTypes, Op, INTEGER} = require("sequelize")
const {database,username,password,dialect} = dbConfig
const modelUser = require("../models/User")

const sequelize = new Sequelize(database,username,password,{
    dialect : dialect,
    define : {
        timestamps : false}
    })

     
     const Auth = sequelize.define('Authuser',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        password : {
            type : DataTypes.STRING
    
        },
        email : {
            unique:true,
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
            isEmail:true,
        },
    
        },
       

    },{
        freezeTableName : true,
    })
  

    // sequelize.sync({alter:true}).then( async () =>{
    //     console.log("synced")
        
    //         //let auth, user
    //         //   const data = await modelUser.User.findOne({ where: { username: "rafay1" } })
    //         //   console.log("data",data)
    //         //   //user = data
    //         //   const data_1 = await Auth.findOne({where:{id:"1"}})
    //         //   //auth = data_1
    //         //   console.log(await data.getUser())
    //         //   data.set({AuthuserId : data_1})
    //         //   console.log("data_1",data_1)
                  
              
    //           //auth.setUser(auth)
    // })
    

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = {Auth}