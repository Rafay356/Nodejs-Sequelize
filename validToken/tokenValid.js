const jwt = require("jsonwebtoken")
const express = require("express");
const app = express()

app.use(express.json())

module.exports = function (req,res,next) {

    const token = req.header("token")//name that will used in postman header
    if(!token) return res.status(401).send("Access Denied")

    try{
// verify decoded and returns the decoded value
//decode only decod the value not return the values
        const verifyToken = jwt.verify(token, "secret key")
        req.user = verifyToken
        next()

    }catch(err){
        res.status(401).send("Auth Failed")

    }
}