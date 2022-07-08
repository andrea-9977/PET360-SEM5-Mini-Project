
const { errorHandler } = require('../helpers/dbErrorhandle');
const Category = require('../models/category');

//reading cat
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
               error: 'Sorry but the Category mentioned does not exist'
            });
        }
        req.category = category;
        next();
    });
};

//creating new cat
exports.create = (req,res)=>{
    const category = new Category(req.body);
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler
            });
        }
        res.json({data});
    });

};

//reading
exports.read = (req, res) => {
    return res.json(req.category);
};

//update
exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category updated successfully!', req.params.categoryId);
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
//delete
exports.remove = (req, res) => {
        //const category = req.category;
        // Category.find({ category }).exec((err, data) => {
        // if (data.length >= 1) {
        //     return res.status(400).json({
        //         message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
        //     });
        // } else {
        //     category.remove((err, data) => {
        //         if (err) {
        //             return res.status(400).json({
        //                 error: errorHandler(err)
        //             });
        //         }
        //         res.json({
        //             message: 'Category deleted'
        //         });
        //     });
        // }
   // });
   const category = req.category;
   category.name = req.body.name;
   category.remove((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({
           message: "Catergory deleted!"
       });
   });
};

//listing all cat
exports.listcat = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


