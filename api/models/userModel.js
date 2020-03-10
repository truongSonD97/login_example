'use strict'
var mongoose = require('mongoose');
const mailValid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ;
var Schema = mongoose.Schema;
const phoneValid = /((09|03|07|08|05)+([0-9]{8})\b)/g;
var user = new Schema({
    email:{
        type: String,
        required:[true,"can't not empty"],
        index:true,
        lowercase: true,
    },
    password:{
        type:String,
        required:[true,"can't not empty"]
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phoneNumber:{
        type:String,
    },
    is_admin:{
        type:Boolean,
        default: false
    }
})
module.exports = mongoose.model("user",user);