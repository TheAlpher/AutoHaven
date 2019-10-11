const Carmodel=require("../model/carmodel.js");
const teammodel=require("../model/teammodel.js");
const news=require("../model/newsletter");
const Booking=require("../model/booking");
const fs=require('fs');
const validator=require('validator');
module.exports.viewHomePage = (req,res)=>{
 res.status(201).render("home.pug");   
}
module.exports.viewAboutPage = (req,res)=>{
    res.status(201).render("aboutus.pug");
}
module.exports.viewContactPage = (req,res)=>{
    res.status(201).render("contactus.pug");
}
module.exports.viewTeamPage=async (req,res)=>{
    let allTeams= await teammodel.find();
    console.log("#####################");
    console.log(allTeams);
    let allTeams1=allTeams.splice(0,1);

    res.status(201).render("teams.pug",{teams:allTeams,teams1:allTeams1});
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