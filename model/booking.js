const mongoose=require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
         type: String,required:true
     },
     picklocation:{
         type:String,required:true 
     },
     telephone: {
         type: String,required:true
         
     },
     pickcar: {
         type: String,required:true
        
     },
     date: {
         type: Date,
           default: () => Date.now() + 5.5*60*60*1000
     }})
   
 mongoose.model('Booking', UserSchema);
 module.exports = mongoose.model('Booking');
 