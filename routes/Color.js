

const express = require('express'); //import express

// 1.
const router = express.Router({ mergeParams: true })
// 2.
const colorController = require('../controller/color'); 
// 3.
router.post('/color', colorController.newColor);

router.post('/color/:id', colorController.colorUpdate)

router.get('/color', colorController.getColor) 
// 4. 
module.exports = router; // export to use in server.js



