const express = require('express'); //import express
const verify = require("../validToken/tokenValid")
// 1.
//const router  = express.Router(); 
const router = express.Router({ mergeParams: true })
// 2.
const UserController = require('../controller/User'); 
// 3.
router.get('/user',UserController.getallUser);


//router.get('/api/user', verify,UserController.getUser)

router.get('/user/:id', UserController.getuserId)
router.get('/user/:name', UserController.getuserName)

router.put('/user/:id', UserController.userUpdate) 
// 4. 

router.post('/user/login', UserController.userValid)

//router.post('/user/color',UserController.newColor);

router.post('/user',UserController.newUser)

router.post('/user/:id',UserController.isDelete)

module.exports = router