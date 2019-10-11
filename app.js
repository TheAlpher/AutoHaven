

// imports
const mongoose=require("mongoose");
const express = require("express");
// var Booking = require('./model/booking')
// var news=require('./model/newsletter.js');
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

// app.post('/api/booking',(req,res)=>{
//     console.log(req.body)
//     book= {
//         name:req.body.name, 
//         picklocation: req.body.location,
//         telephone:req.body.telephone,
//         pickcar:req.body.pickcar
//     }
//     Booking.create(book)
//     .then(book1 => {
//         res.json({
//             message: 'Booking confirmed  for  '+ book1.name +"   " +book1.telephone
//         })
//     })


// })
// app.post('/api/newsletter',(req,res)=>{
//      console.log('abc@@@@@@')
//     newsletter= {
//         email:req.body.email
     
//     }
//     news.create(newsletter)
//     .then(nu => {
//         console.log('Hi',nu)
//         res.json({
//             news: "bhjdunga roz akhbaar" + nu.email
//         })
//     })
//     .catch(err => {
//        console.log(err)
//        res.json(err.errmsg)
//       })
// })
    

    
   

app.use("/",carRouter);
app.use(express.static("public"));
app.set("view engine", "pug");
// views folder
app.set("views", "template");

// server
module.exports = app;
