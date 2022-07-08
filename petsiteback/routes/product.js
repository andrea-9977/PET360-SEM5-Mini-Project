const express = require('express');
const router = express.Router()
// controller to handle incoming routes
const {create , productById ,read , remove,update , 
    listpod , ListRelatedpod , listCategories,listBySearch,photo,listSearch }  = require("../controller/product");
const { requireSignin, isAuth, isAdmin} = require("../controller/auth");
const {userById} = require("../controller/user");
const product = require('../models/product');

//routes
router.get('/product/:productId',read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId',requireSignin, isAuth, isAdmin,update)
router.get('/products',listpod)
router.get('/products/related/:productId', ListRelatedpod)
router.get('/products/categories', listCategories)
router.post('/products/by/search' , listBySearch)
router.get('/products/search' , listSearch)
router.get('/product/photo/:productId', photo)
//methods
router.param('userId',userById);
router.param('productId',productById)

module.exports = router;