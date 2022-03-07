const jwt = require("jsonwebtoken")
const modelAuth = require("../models/auth");
const bcrypt = require("bcrypt");
const verify = require("../validToken/tokenValid")


const authUser = async (req, res, next) => {
        
        const salt = await bcrypt.genSalt(10)
        //store hash bcrypt.hash
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        //new User
        //create userauth using model 
    const auth = new modelAuth.Auth({
                id:req.body.id,
                password : hashPassword,
                email : req.body.email
            })
            //console.log("auth",auth)
            try {

             await auth.save()
               

                res.status(200).json({
                    
                    savedUser: " Registered"
                })

            }
            catch (emailExist) {
                
                res.status(404).json({
                    
                    emailExist: auth.email,
                    emailExist
                })
            }
        }       



const valauthUser =  async (req,res, next) =>{
   
    const userEmail = await modelAuth.Auth.findOne({where:{email:req.body.email, username:req.body.username}})
//console.log(user)
    if(!userEmail) return res.send("Email doesnt exist")
  
    //comparing

        const validPass =  await bcrypt.compare(req.body.password,userEmail.password)
        //console.log("user password",user.password,"re body",req.body.password)
        //console.log("valid ", validPass)
        if(!validPass) return res.send("Invalid")

        const token = jwt.sign({_id : userEmail._id}, "secret key")
        res.header("auth_user", token).send(token)
        //res.send("Login Success")
    
}


module.exports = {authUser,valauthUser};