const express = require('express');
const router = express.Router()
// controller to handle incoming routes
const {create , categoryById , read , update , remove , listcat} = require("../controller/category");
const { requireSignin, isAuth, isAdmin} = require("../controller/auth");
const {userById} = require("../controller/user");

//routes
router.get('/category/:categoryId', read); //remember the order matters! of the middlewares
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', listcat);

router.param('userId',userById);
router.param('categoryId',categoryById);

module.exports = router;