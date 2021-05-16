
const objectSchema = require('../modal/schema');
const mongoose = require('mongoose');


async function getAllObjectSchema(){
    var objectschemalist
   const object = await objectSchema.find({},function (err,docs){
        if (err){
            console.log(err);
        }
        else{
             objectschemalist =  docs.map((obj)=>{
                let json ={};
                obj.properties.forEach(ele => {
                    let propjson = {}
                    propjson['type']=ele.datatype;
                    propjson['required']=ele.required;
                    json[ele.name]=propjson
                });
                console.log('this is schema',json)
                let schemajson = {};
                schemajson[obj.name]=mongoose.model(obj.name,new mongoose.Schema(json))
            return schemajson;
             });
             console.log("this is from recordschema",objectschemalist);
        }
    });
    console.log("this is object var ", object);
    return objectschemalist;
}


module.exports = {getAllObjectSchema};