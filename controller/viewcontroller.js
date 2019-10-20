const Carmodel=require("../model/carmodel.js");
const teammodel=require("../model/teammodel.js");
const news=require("../model/newsletter");
const reviewmodel=require("../model/reviewmodel");
const Booking=require("../model/booking");

const fs=require('fs');
const validator=require('validator');
module.exports.viewHomePage = (req,res)=>{
    console.log("User="+res.locals.user);
    let user=res.locals.user;
 res.status(201).render("home.pug",{user:user});   
}
module.exports.viewAboutPage = (req,res)=>{
    res.status(201).render("aboutus.pug");
}
module.exports.viewReviewPage = (req,res)=>{
    console.log("User="+res.locals.user);
    let user=res.locals.user;
    res.status(201).render("review.pug",{user:user});
}
module.exports.viewLoginPage = (req, res) => {
  res.status(201).render("login.pug");
};
module.exports.viewAccountPage = async  (req,res)=>{
    let user=res.locals.user;
   let bookings=await Booking.find({email:user.email}); 
   console.log(bookings);
    res.status(201).render("me.pug",{user:user,bookings:bookings});
}
module.exports.viewForgotPasswordPage = (req, res) => {
    res.status(201).render("forgotpassword.pug");
  };
  module.exports.viewChangePasswordPage = (req, res) => {
    res.status(201).render("changepassword.pug");
  };
  module.exports.viewBookingPage= async (req,res)=>
  {
          let id=req.params.id;
          let user=res.locals.user;
          let car= await Carmodel.findById(id);
          res.status(201).render("bookingform.pug",{car:car,user:user});
  }  
module.exports.viewSignupPage = (req, res) => {
  res.status(201).render("signup.pug");
};
module.exports.viewContactPage = (req,res)=>{
    res.status(201).render("contactus.pug");
}
module.exports.viewTeamPage=async (req,res)=>{
    let allTeams= await teammodel.find();
    let allTeams1=allTeams.splice(0,1);
    let allReviews= await reviewmodel.find();
    let allReviews1=allReviews.splice(0,1);
    console.log("#####################");

    

    res.status(201).render("teams.pug",{teams1:allTeams1,teams:allTeams,reviews1:allReviews1,reviews:allReviews});
}
module.exports.viewCarsPage=async (req,res)=>{
    let allCars=await Carmodel.find();
    res.status(201).render("cars.pug",{cars:allCars});
}
module.exports.viewCarPage= async (req,res)=>{
    let id=req.params.id;
    let car= await Carmodel.findById(id);
    res.status(201).render("eachcar.pug",{car:car});
}
module.exports.viewBookingPage= async (req,res)=>
{
        let id=req.params.id;
        let user=res.locals.user;
        let car= await Carmodel.findById(id);
        res.status(201).render("bookingform.pug",{car:car,user:user});
}