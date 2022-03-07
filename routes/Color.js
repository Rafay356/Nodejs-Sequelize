

const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const colorController = require('../controller/color'); 
// 3.
router.get('/color', colorController.newColor); 
// 4. 
module.exports = router; // export to use in server.js



