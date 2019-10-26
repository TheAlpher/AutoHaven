const express = require("express");
let carRouter = express.Router();
// let obj=require("../controller/plancontroller");
// let createPlan=obj.createPlan();
// createPlan();
let {addnewbooking,addnewreview,addnewslettersub,addenquiryrequest,gethome,getteam,addteammem,updateteammem,removeteammem,getaboutus,getcontact,getallcars,getcardetails,addcar,updatecar,removecar
} = require("../controller/carcontroller.js");
let {
  viewAccountPage,
  viewHomePage,
  viewResetPasswordPage,
  viewAboutPage,
  viewContactPage,
  viewTeamPage,
  viewCarsPage,
  viewCarPage,
  viewLoginPage,
  viewForgotPasswordPage,
  viewChangePasswordPage,
  viewSignupPage,
  viewReviewPage,
  viewBookingPage
} = require("../controller/viewcontroller.js");
let {
  isloggedIn,
  protectRoute,
  isloggedOut
} = require("../controller/authcontroller.js");
// carRouter
// .route(['/','/home'])
// .get(gethome);
//carRouter.use(isloggedIn);
carRouter
.route(['/','/home'])
.get(isloggedIn,viewHomePage);
// carRouter.route('/team')
// .get(getteam);
carRouter.route('/team')
.get(isloggedIn,viewTeamPage);
carRouter.route('/review')
.get(isloggedIn,viewReviewPage);
carRouter.route("/resetPassword").get(viewResetPasswordPage);
// carRouter
// .route('/api/newsletter')
// .get(getteam);
carRouter
.route('/api/review')
.post(addnewreview)
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
.get(isloggedIn,viewAboutPage);
carRouter
.route('/signup')
.get(viewSignupPage);
carRouter.route("/login").get(viewLoginPage);
carRouter.route('/forgotpassword')
.get(isloggedIn,viewForgotPasswordPage);
carRouter.route('/changepassword')
.get(isloggedIn,viewChangePasswordPage);
carRouter.route('/me')
.get(isloggedIn,viewAccountPage);
carRouter
.route('/contact-us')
.get(isloggedIn,viewContactPage);
// carRouter
// .route('/car-catalogue')
// .get(getallcars);
carRouter
.route('/car-catalogue')
.get(isloggedIn,viewCarsPage);
carRouter
.route('/car/:id')
//.get(getcardetails)
.patch(updatecar)
.delete(removecar)
.get(isloggedIn,viewCarPage);
carRouter
.route('/book/:id')
.get(isloggedIn,viewBookingPage);
carRouter
.route('/add')
.post(addcar);
module.exports=carRouter;