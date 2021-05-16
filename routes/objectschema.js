const express = require('express');
const router = express.Router();
const objectSchema = require('../modal/schema');
const cors = require('cors');
const {getAllObjectSchema} = require('../modal/recordschema');
console.log('object schema huhuhuuh',objectSchema)
const mongoose = require('mongoose');
const {ensureAuth } = require('../middlware/auth');
var allobjectschema ={};
getAllObjectSchema().then(e=>{
    
    e.forEach(ele=>{
        allobjectschema[Object.keys(ele)] = ele[Object.keys(ele)];
    })
    console.log(allobjectschema);
    
});
router.get('/',async(req, res) => {
try {
    const object = await objectSchema.find()

    res.json(object);
} catch (error) {
    res.status(500).json({message:error.message});
}

});
router.get('/:obj', async(req, res) => {

    try {
        const object = await objectSchema.find({name:req.params.obj})
        console.log(await allobjectschema);
        const obj = await allobjectschema;
        console.log(obj[req.params.obj]);
        res.json(object);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
    });
    router.get('/:obj/record', async(req, res) => {

        try {
            console.log(await allobjectschema);
            const obj = await allobjectschema;
            const record = await obj[req.params.obj].find();
            console.log(record);
            res.json(record);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
        
        });
    router.post('/:obj', async (req, res) => {
        const obj = await allobjectschema;
        const record = new obj[req.params.obj](req.body);
        try {
            
            const newRecord  = await record.save();
            res.status(201).json(newRecord);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    });
router.post('/', async (req, res) => {
const object = new objectSchema(req.body);
try {
    const newObject = await object.save();
    res.status(201).json(newObject);
} catch (error) {
    res.status(400).json({message:error.message});
}

});
router.patch('/:objname',getSchema,async(req, res) => {
    res.object[0].properties.push(req.body)
    console.log('hello',res.object);
    let propjson = {}
    let json = {}
    propjson['type']=req.body.datatype;
    propjson['required']=req.body.required;
    json[req.body.name]=propjson
    try {

        console.log(mongoose.model(req.params.objname).schema);
        mongoose.model(req.params.objname).schema.add(json);
        console.log(mongoose.model(req.params.objname).schema);
        const respond = await res.object[0].save();
        res.status(201).json(respond);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});
router.delete('/', (req, res) => {

});
async function getSchema(req,res,next){

    let object
    try {
        object = await objectSchema.find({name:req.params.objname});
        if(object==null){
            return res.status(404).json({message:'no object'});
        }
    } catch (error) {
        return res.status(500).send('hello');
    }
    res.object = object
    next()
}


module.exports = router