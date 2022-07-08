const Product = require('../models/product');
const formidable = require('formidable');
const _  = require('lodash');
const fs = require('fs');
const {errorHandler}= require('../helpers/dbErrorhandle');

//middleware
exports.productById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if (err ||!product){
            return res.status(400).json({
                error:"Product not found!"

        });
    }
    req.product = product;
    next()
  });

};
//reading the product deets
exports.read = (req, res) => {
    req.product.photo = undefined;  //huge size pics so resp can get late so undef.
    return res.json(req.product);
};
//creating a new product
exports.create = (req,res) =>{
    //goto send form data from client side pack->formidable , loadash
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Could not upload the image! Sorry!"
            });
        }
// checking for all fields
        const { name, description, price, category, quantity, shipping } = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required, so please fill the empty field"
            });
        }
        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};
//removing a product
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            deletedProduct,
            message: 'The above Product has been deleted successfully'
        });
    });
};
//update product info same as create but.
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
// checking for all fields
        const { name, description, price, category, quantity, shipping } = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required, so please fill the empty field"
            });
        }
        let product = req.product; //this is diff we asking the existing product
        product = _.extend(product, fields); //product and updated field
//checking size
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

//sell and arrival ie which is sold most to show as the "most popular"
/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

 exports.listpod = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; //def order
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'; //sorting def is sortby id
    let limit = req.query.limit ? parseInt(req.query.limit) : 10; //how much to show

    Product.find()
        .select('-photo') //deselecting photots as itll be a load.
        .populate('category') //show
        .sort([[sortBy, order]]) //sorting the view
        .limit(limit)//how much
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Sorry ! Products not found'
                });
            }
            res.json(products);
        });
};

//listing related products  
exports.ListRelatedpod = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
//$ne means not included as the product which the customer wants cannot be on the list of related product
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name') // pop only certain feilds we took id and name
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Sorry! Products not found'
                });
            }
            res.json(products);
        });
};

//returning catgories based on product
exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => { //distint used in mongo to get all cat that are used for the product
        if (err) {
            return res.status(400).json({
                error: 'Sorry! Categories not found'
            });
        }
        res.json(categories);
    });
};
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip); //load more button ?
    let findArgs = {};
 
    console.log(order, sortBy, limit, skip, req.body.filters);
    console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Oops! Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
//photo
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.listSearch = (req,res) =>{
    //creating query obj to hold serach valur and cat value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' }; //i for case insensiti so no prob in case
        // assign category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo'); //taking pic out cause it will slow down 
    }
}


