const mongoose=require("mongoose");
const validator=require('validator');
const newsschema = new mongoose.Schema({
    email:{type:String,required:true,unique:true, validate : function()
        { 
            return validator.isEmail(this.email);
        },message:"Please enter a valid email"},
    })
   
 const newsmodel=mongoose.model('Newsletter', newsschema);
 module.exports =newsmodel;
 