const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const modelUser = require("../models/User");
const modelColor = require("../models/Color");
const verify = require("../validToken/tokenValid");
const Sequelize = require("sequelize");
//const modelColor = require("../models/Color")

app.use(express.json());
//Get All User Data
const getallUser = (req, res, next) => {
  modelUser.User.findAll({
    attributes: { exclude: ["password"] },
  }).then((User) => {
    res.status(200).json(User);
  });
};

// const getUser = (req,res)=>{
//     model
// }

//Get User By Id
const getuserId = (req, res, next) => {
  const id = req.params.id;
  modelUser.User.findByPk(id).then((data) => {
    if (id <= data || id != data) {
      res.status(200).json(data);
    } else {
      res.status(404).send({ message: "Id " + id + " Not Found" });
    }
  });
};
//Get User by Name
const getuserName = async (req, res, next) => {
  const user = req.params.name;
  console.log("user", user);

  const User = await modelUser.User.findOne({ where: { username: user } });
  if (!User) return res.status(404).send("UserName not Found");
  res.send(User);

  // console.log("req",req.params.user)
  //     const userName = await modelUser.User.findAll({where:{username:user}})
  //     console.log(userName)
  //     res.send(userName)
  //return res.status(200).send(userName)
  // if(!userName || userName == null)
  // console.log(userName)
  // return res.status(404).send("user Not Found")
};

//Creating new user and generating hash password
const newUser = async (req, res) => {
  const salt = await bcrypt.genSalt();
  //store hash bcrypt.hash
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //new User
  //create user using model
  const userReg = new modelUser.User({
    password: hashPassword,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
  });
  try {
    await userReg.save();

    res.status(200).json({
      savedUser: " Registered",
    });
  } catch (emailExist) {
    res.status(404).json({
      emailExist: userReg.email,
      emailExist,
    });
  }
  //console.log("req user id",req.body.)
};
// const newColor = async  (req,res,next)=>{
//     const user = await modelUser.User.findOne({where:{id:"1"}})
//     console.log("userid")
//     const un = {
//     userId : user.id,
//     color_name:req.body.color_name

// }
// modelColor.Color.create(un).then(() =>{
// res.status(400).json({
//     message : "Color Entered",
//     color:un
// })
// }).catch((re)=>{
// res.status(404).json({
//     message : "not Entered",
//     re
// })
// })
// }

//comparing the hash password  with the plain password to get the valid result
const userValid = async (req, res, next) => {
  const userEmail = await modelUser.User.findOne({
    where: { email: req.body.email },
  });
  //console.log(user)
  if (!userEmail) return res.status(401).send("Auth Failed");

  //comparing

  const validPass = await bcrypt.compare(req.body.password, userEmail.password);
  //console.log("user password",user.password,"re body",req.body.password)
  //console.log("valid ", validPass)
  if (!validPass) return res.status(203).send("Auth Failed");

  if (validPass) {
    //assigning the sign and password to the valid user who have token or secret key
    const token = jwt.sign(
      { id: userEmail.id, email: userEmail.email },
      "secret key",
      { expiresIn: "1h" }
    );
    return res.status(200).header("auth_user", token).json({
      message: "Login Success",
      token: token,
    });
    // res.header("auth_user", token).send(token)
  }

  // res.header("auth_user", token).send(token)
};

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

//updating the User
const userUpdate = async (req, res) => {
  const un = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  // console.log("req body",un)
  const id = req.params.id;
  // console.log(id)
  const updateUser = await modelUser.User.update(un, { where: { id: id } });
  if (updateUser)
    return res.status(200).json({
      id: id,
      User_Updated: un,
    });

  console.log(updateUser);
};

// Deleting user
const isDelete = async (req, res) => {
  //     const del = await modelUser.User.findOne({where: {id:req.params.id}})
  //     if(!del) return res.status(404).send("Not Found")
  //     else{
  //         await modelUser.User.
  //     }
};

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
  //newColor,
  userValid,
  //getUser,
  getallUser,
  getuserId,
  getuserName,
  userUpdate,
  isDelete,
};
