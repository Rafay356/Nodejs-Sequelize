const modelColor = require("../models/Color")
const newColor = (req, res, next) => {
        modelColor.Color.findAll().then((Color)=>{
            res.json(Color)})
};



module.exports = {newColor};