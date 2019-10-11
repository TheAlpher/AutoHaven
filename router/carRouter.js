const express = require("express");
let carRouter = express.Router();
// let obj=require("../controller/plancontroller");
// let createPlan=obj.createPlan();
// createPlan();
let {addnewbooking,addnewslettersub,addenquiryrequest,gethome,getteam,addteammem,updateteammem,removeteammem,getaboutus,getcontact,getallcars,getcardetails,addcar,updatecar,removecar
 
} = require("../controller/carcontroller.js");
let {viewHomePage,viewAboutPage,viewContactPage,viewTeamPage,viewCarsPage,viewCarPage
 
} = require("../controller/viewcontroller.js");
// carRouter
// .route(['/','/home'])
// .get(gethome);
carRouter
.route(['/','/home'])
.get(viewHomePage);
// carRouter.route('/team')
// .get(getteam);
carRouter.route('/team')
.get(viewTeamPage);
// carRouter
// .route('/api/newsletter')
// .get(getteam);
carRouter
.route('/api/booking')
.post(addnewbooking)
carRouter
.route('/api/newsletter')
.post(addnewslettersub)
carRouter
.route('/api/contactenquiry')
.post(addenquiryrequest)
carRouter
.route('/team/add')
.post(addteammem);
carRouter
.route('/team/:id')
.patch(updateteammem)
.delete(removeteammem);

// carRouter
// .route('/about-us')
// .get(getaboutus);
carRouter
.route('/about-us')
.get(viewAboutPage);
carRouter
.route('/contact-us')
.get(viewContactPage);
// carRouter
// .route('/car-catalogue')
// .get(getallcars);
carRouter
.route('/car-catalogue')
.get(viewCarsPage);
carRouter
.route('/car/:id')
//.get(getcardetails)
.patch(updatecar)
.delete(removecar)
.get(viewCarPage);
carRouter
.route('/add')
.post(addcar);


module.exports=carRouter;