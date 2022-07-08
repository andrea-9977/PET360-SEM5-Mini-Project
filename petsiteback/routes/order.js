const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
const { userById, addOrderToUserHistory } = require("../controller/user");
const {create , listOrders} = require("../controller/order")

//creating order
router.post("/order/create/:userId",requireSignin,isAuth,addOrderToUserHistory,create);
//listing
router.get('/order/list/:userId', requireSignin,isAuth,isAdmin,listOrders)
router.param("userId", userById)

module.exports = router;