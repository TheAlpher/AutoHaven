const mongoose=require("mongoose");

const DB= "mongodb+srv://thealpher:123abc@cluster1-ig5en.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true
})
.then(conn=>{
// console.log(conn.connection);
console.log("Connected to DB");
});
const carschema = new mongoose.Schema(
    {   
        Name:{type:String,required:true,unique:true},
        Rent:{type:Number,required:true},
        Bodytype:{type:String,required:true},
        Mph060:{type:Number,required:true},
        Year:{type:Number,required:true},
        TopSpeed:{type:Number,required:true},
        Transmission:{type:String,required:true},
        Displacement:{type:Number,required:true},
        Description:{type:String,required:true},
        minidescription:{type:String,required:true},
        Airbags:{type:Number,required:true},
        Rating:{type:Number,required:true},
        img1:{type:String,required:true},
        img2:{type:String,required:true},
        img3:{type:String,required:true},
        img4:{type:String,required:true},        
        ABS:{type:Boolean,required:true},
        CruiseControl:{type:Boolean,required:true},
        ClimateControl:{type:Boolean,required:true},
        AlloyWheels:{type:Boolean,required:true},
        PaddleShift:{type:Boolean,required:true},
        SteeringMountedControls:{type:Boolean,required:true},
        Ways6AdjustSeats:{type:Boolean,required:true},
        Sunroof:{type:Boolean,required:true}
        
        

        
    }
)

const carmodel=mongoose.model("carmodel",carschema);
module.exports=carmodel;






