const express = require("express");
let carRouter = express.Router();
// let obj=require("../controller/plancontroller");
// let createPlan=obj.createPlan();
// createPlan();
let {gethome,getteam,addteammem,updateteammem,removeteammem,getaboutus,getcontact,getallcars,getcardetails,addcar,updatecar,removecar
 
} = require("../controller/carcontroller.js");
carRouter
.route(['/','/home'])
.get(gethome);
carRouter
.route('/team')
.get(getteam);
carRouter
.route('/team/add')
.post(addteammem);
carRouter
.route('/team/:id')
.patch(updateteammem)
.delete(removeteammem);

carRouter
.route('/about-us')
.get(getaboutus);
carRouter
.route('/contact-us')
.get(getcontact);
carRouter
.route('/car-catalogue')
.get(getallcars);
carRouter
.route('/:id')
.get(getcardetails)
.patch(updatecar)
.delete(removecar);
carRouter
.route('/add')
.post(addcar);


module.exports=carRouter;