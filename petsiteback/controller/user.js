const User = require('../models/user');
const {errorHandler} = require("../helpers/dbErrorhandle")
const { Order } = require('../models/order');
exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User not found!'
            });
        }
        req.profile = user
        next();

    });
}

//reading
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

//update

exports.update = (req, res) => {
    console.log('user update', req.body);
    req.body.role = 0; // role will always be 0
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

//order
exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
        });
    })}


//order addition to history
exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

//finding user by id so as to push histroy {new:true for sending back as j resp}
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};
//purchase history
exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandle(err)
                });
            }
            res.json(orders);
        });
};
