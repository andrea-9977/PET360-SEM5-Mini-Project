exports.userSignupValidator = (req,res,next) => {

    req.check('name','Sorry name is required').notEmpty();
    req.check('username')
    .isLength({min: 2 , max:35})
    req.check('email','Please enter your email.')
    .matches(/.+\@.+\..+/)
    .withMessage("Enter valid email")
    .isLength({
        min:5 , max:35
    });
    req.check('hashedpwd','Please enter your password.').notEmpty();
    req.check('hashedpwd')
    .isLength({min: 8})
    .withMessage("Password must contain aleast  8 characters!")
    .matches(/\d/)
    .withMessage("Your password must contain a digit")
    req.check('username','Please enter your username.').notEmpty();
    req.check('username')
    .isLength({min: 2 , max:12})
    .withMessage("Usernames must contain aleast 12 characters!")

    const errors = req.validationErrors();
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error : firstError});

    }
    next(); //anytime we create middleware we need next to go to next page
}