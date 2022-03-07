const express = require('express'); //import express

const router  = express.Router(); 

const AuthController = require('../controller/authcon'); 

 router.post('/user/register', AuthController.authUser)
 
 router.post('/user/login', AuthController.valauthUser)

 

 

// router.get('/user/:id', UserController.getuserId)

// router.get('/user', UserController.updateUser) 


// router.post('/user',UserController.newUser)

//router.delete('/user',UserController.deleteUser)

module.exports = router