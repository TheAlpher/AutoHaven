const mongoose=require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
    fName: {
         type: String,required:true
     },
     lName: {
        type: String,required:true
    },     
    email: {
        type: String,
        required: true,
        validate: validator.isEmail
      },
      contact: {
        type: Number,
        required: true
      },
      carbrand: {
        type: String,required:true
    },
    carmodel: {
       type: String,required:true
   },   
   carrent: {
    type: Number,required:true
},    
     location: {
         type: String,required:true
        
     },
     date: {
         type: Date,
         required:true
     },
    days:{
        type:Number,
        required:true
    } ,
carinfo:{
    type:String,
     required:true
}   })
   
 mongoose.model('Booking', UserSchema);
 module.exports = mongoose.model('Booking');
 