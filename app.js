const express = require("express")
const app = express()
const path = require("path")
const colorRoutes = require("./routes/Color")
const userRoute  = require("./routes/User")
const authRoute  = require("./routes/authrou")
const bodyParser = require("body-parser")
const modelUser = require ("./models/User")
const modelColor = require ("./models/Color")
//const { Sequelize } = require("sequelize/dist")
//to connect seqelize we need to make the  sequelize construtor and initials our DB
// const sequelize = new Sequelize("colors", "root", "UIO786ar",{
//     dialect : "mysql",
//     define : {
//         timestamps : false}
//     }) 
// sequelize.authenticate().then(()=>{
//     console.log("conntected")
// }).catch((err)=>{
//     console.log("authenticate e",JSON.stringify(err))
// })
//sequelize.close()
const staticPath = path.join(__dirname, "website")

app.use(express.urlencoded({extended:true}))
//app.use(bodyParser.json())

app.use(express.static(staticPath))
app.use(express.json())
app.use('/', [colorRoutes,userRoute,authRoute])

// app.use('/', route)

const port = process.env.PORT || 8000
app.listen (port, ()=>{
    console.log(`Listning port ${port}`)
})


//modelUser.User.hasMany(modelColor.Color,{foreignKey:"userId"})
//modelColor.Color.belongsTo(modelUser.User,{foreignKey:"colors"})


// app.listen (8000, () => {

//     console.log("Listning port 8000")
// })

// app.get('/about',function(req,res){
//     console.log(".findall()",models.color)
//     if(req.url == '/about')
//     models.Color.findAll().then((Color)=>{
//         res.json(Color)
        
//     })
// })

//const User = require("./models/User")(sequelize)
//require("./models/color")(sequelize)

