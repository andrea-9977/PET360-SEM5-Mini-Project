const express = require('express');
const router = express.Router()
// controller to handle incoming routes
const {signup ,signin , signout , requireSignin} = require("../controller/auth");
const {userSignupValidator } = require("../validator");

router.post('/signup', userSignupValidator ,signup);
router.post('/signin' ,signin);
router.get('/signout' ,signout);

//req signin restricts not signed users
router.get('/hello',requireSignin,(req,res)=>{
    res.send("hello there welcome to petsite!");
});

module.exports = router;