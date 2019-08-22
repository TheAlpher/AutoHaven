

// imports
const mongoose=require("mongoose");
const express = require("express");
var Booking = require('./model/booking')
var news=require('./model/newsletter.js');
const carRouter = require("./router/carRouter");
const app = express();
// Middle ware
const DB= "mongodb+srv://thealpher:123abc@cluster1-ig5en.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true
})
.then(conn=>{
// console.log(conn.connection);
console.log("Connected to DB");
});
app.use(express.json());
// app.use("/api/activity",express.static("../"))

app.post('/api/booking',(req,res)=>{
    console.log(req.body)
    book= {
        name:req.body.name, 
        picklocation: req.body.location,
        telephone:req.body.telephone,
        pickcar:req.body.pickcar
    }
    Booking.create(book)
    .then(book1 => {
        res.json({
            message: 'Booking confirmed  for  '+ book1.name +"   " +book1.telephone
        })
    })


})
app.post('/api/newsletter',(req,res)=>{

    newsletter= {
        email:req.body.email
     
    }
    try{
    news.create(newsletter)
    .then(book => {
        res.json({
            message: 'NewsLetter service added to '+book.email
        })
    })
   }
   catch(err)
   {
     res.json({
         message:"Please enter a valid email"
     })
   }

})

app.use("/car",carRouter);
app.use(express.static("public"));

// server
module.exports = app;
