const mongoose = require('mongoose');
const propertie = new mongoose.Schema({
    name:{
        type:String
    },
    datatype:{
        type:String
    },
    islookup:{
        type:Boolean
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    required:{
       type:Boolean 
    },
    parent:{
        type:String
    }
})
const object = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    properties:{
        type:[propertie]
    },
    createdDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    lastMOdifiedDate:{
        type:Date
    },
    owner:{
        type:String,
        required:true
    }
})

console.log("this is object",object);

module.exports = mongoose.model('objectSchema',object);