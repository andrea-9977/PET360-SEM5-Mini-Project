const mongoose = require('mongoose')
const crypto = require('crypto') //hashing pwds
const bcrypt = require('bcrypt');
// const uuidv1 = require('uuid/v1') 
//to generate unique strings
const { v1: uuidv1 } = require('uuid');

const db = require('../helpers/dbErrorhandle');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:32
    },
    username:{
        type: String,
        trim: true,
        required: true,
        maxlength:12
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique:32
    },
    hashedpwd:{
        type: String,
        required: true,
    },
    about:{
        type: String,
        trim: true,
    },
    salt: String,
    role: {
        type: Number, //using 0 n 1 for assgining roles...
        default: 0 // 1 is admin
    },
    history:{
        type: Array,
        default: []
    }
 
},{timestamps: true});

//virtual field

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashedpwd = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    authenticate:  function(plainText) {
        const result = this.encryptPassword(plainText);
        return result === this.hashedpwd;
        // const account = await db.User.findOne({ email });

        // // check account found and verify password
        // if (!account || !bcrypt.compareSync(plainText, account.passwordHash)) {
        //     // authentication failed
        //     return false;
        // } else {
        //     // authentication successful
        //     return true;
        // }
        // const result = this.encryptPassword(plainText);
        // return bcrypt.compareSync(result,this.hashed_password)

    },

    encryptPassword : function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1',this.salt)
                            .update(password)
                            .digest('hex');
            // return bcrypt.hashSync(password, 10).update(password);
        }catch (err){
            return ' ';
        }
    }
};

module.exports = mongoose.model("User",userSchema);