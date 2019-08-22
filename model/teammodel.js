const mongoose=require("mongoose");
const validator=require("validator");
const DB= "mongodb+srv://thealpher:123abc@cluster1-ig5en.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true
})
.then(conn=>{
// console.log(conn.connection);
console.log("Connected to DB");
});

const teamschema = new mongoose.Schema(
    {   
     name:{type:String,required:true, validate : function()
        { var val1=this.name.split(" ").join('');
            return validator.isAlpha(val1);
        },message:"Please enter a valid name"},
     position:{type:String,required:true },
        description:{type:String,required:true},
        imagemin:{type:String,required:true},
        imagebig:{type:String,required:true}


    }
    )
    const teammodel=mongoose.model("Teammodel",teamschema);
module.exports=teammodel;