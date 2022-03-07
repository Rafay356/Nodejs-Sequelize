const jwt = require("jsonwebtoken")

module.exports = function (req,res,next) {

    const token = req.header("auth_token")
    if(!token) return res.status(401).send("Access Denied")

    try{

        const verifyToken = jwt.verify(token, "secret key")
        req.user = verifyToken
        next()

    }catch(err){
        res.status(400).send("Invalid Token")

    }
}