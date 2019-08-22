const mongoose=require("mongoose");
const validator=require('validator');
const newsschema = new mongoose.Schema({
    email:{type:String,required:true,unique:true}
    })
   
 const newsmodel=mongoose.model('Newsletter', newsschema);
 module.exports =newsmodel;
 