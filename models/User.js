const dbConfig = require("../dbconfig/config") 
const {Sequelize, DataTypes, Op} = require("sequelize")
const modelAuth = require("../models/auth")
const {database,username,password,dialect} = dbConfig

const sequelize = new Sequelize(database, username, password,{
    dialect : dialect,
    define : {
        timestamps : false,
        }
    })

     
     const User = sequelize.define('users',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true

        },
        first_name :{
            type : DataTypes.STRING
        },
        last_name : {
            type : DataTypes.STRING
        },
        username:{
            type : DataTypes.STRING,
            unique:true,
            allowNull:false,

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
        // AuthuserId:{
        //     type : DataTypes.INTEGER,
        //     setUser() {

        //     } 
        //     //allowNull:false,

        // }
    },
    {
        freezeTableName : true
    })
    //source Auth  and traget User
    //hasone: insert association key in the target (User)
    //belongsTo: insert the association key in the source(Auth)
   
   //User.hasOne(modelAuth.Auth)   // Auth should be added in User
  // modelAuth.Auth.belongsTo(User) // Auth id should be added in User
  
   User.sync({alter:true}).then(()=>{

   }).catch((err)=>{

         console.log(err)
     })
     
//     return modelAuth.Auth.findOne({ where: { id: 1 } })
//     }).then((user)=>{
//         const user_ = new modelAuth.Auth(user)
//         //console.log("data",data)
//        // console.log("user",user)
//         //return modelAuth.Auth.findOne({where:{id:1}}).then((auth)=>{
            
//             console.log("auth",JSON.stringify(user))
//         //})


//     }).catch((err)=>{

//         console.log(err)
//     })

     

//      try{
//   const data = await User.findOne({ where: { username: "rafay1" } })
//   user = data
//   return data
//      }
//      catch(err){
//         console.log(err)
    
//     }
//   //console.log(data)
//   //user = data
//   try{
//   const data_1 = await modelAuth.Auth.findOne({where:{id:"1"}})
//   auth=data_1
//   return data_1

 
//   }catch(err){
//     console.log(err)

// }
  //auth.setUser(user)
  
  

  //auth = data_1
 // console.log(await getUser(data))
 

      
//   User.sync({alter:true}).then(async ()=>{
//     const modelAuth = require("../models/auth")
//     //let auth, user
//       const data = await User.findOne({ where: { username: "rafay1" } })
//       console.log("data",data)
//       //user = data
//       const data_1 = await modelAuth.Auth.findOne({where:{id:"1"}})
//       //auth = data_1
//       console.log(await data.getUser())
//       User.setUser(data)
//       console.log("data_1",data_1)
          
      
//       //auth.setUser(auth)
//   })
//   }).catch((err)=>{
//       console.log(err)

//   })
//     //const usern = User.build({first_name:"abdul",last_name:"rafay",username:"abdul123",password:123,email:"rafay356@gmail.com"})
//     //return usern.save()
//     }).then(()=>{
//         console.log("Enterned User")

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = {User}