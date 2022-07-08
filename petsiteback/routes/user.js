const express = require('express');
const router = express.Router()
// controller to handle incoming routes
const {userById , read , update , purchaseHistory} = require("../controller/user");
const {requireSignin ,isAdmin,isAuth} = require("../controller/auth");

//test
router.get('/sercret/:userId', requireSignin, isAuth, isAdmin, (req,res) => {
    res.json({
        user: req.profile  // contains user info by id 
    });
});
router.get('/user/:userId' , requireSignin,isAuth,read)
router.put('/user/:userId' , requireSignin,isAuth,update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId',userById)



module.exports = router;