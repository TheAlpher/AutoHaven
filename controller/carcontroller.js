
const Carmodel=require("../model/carmodel.js");
const teammodel=require("../model/teammodel.js");
const news=require("../model/newsletter");
const Booking=require("../model/booking");
const fs=require('fs');
const validator=require('validator');



module.exports.addnewbooking= async(req,res)=>{
  var val1=req.body.name.split(" ").join('');
  var val2=req.body.telephone;
  var x=(validator.isAlpha(val1)&&validator.isNumeric(val2));
  console.log("req.body.picklocation");
  if(req.body.picklocation=="Pick Location"||req.body.pickcar=="Choose Car")
  {
    res.json({
      message:"All fields are compulsory"
    })
  }
  else{
  if(x){  
    book= {
    name:req.body.name, 
    picklocation: req.body.location,
    telephone:req.body.telephone,
    pickcar:req.body.pickcar
}
console.log(book);
Booking.create(book)
.then(book1 => {
    res.json({
        message: 'Booking confirmed  for  '+ book1.name +"   " +book1.telephone
    })
}).catch(err=> {
  console.log(err.errmsg);
  res.json({message:"Booking already registered with this number Use a different number"})
})

  }
  else{
    res.json({
      message:"Please enter  valid Contact Details"
    })
  }
}
}
module.exports.addnewslettersub=async (req,res)=>{

           var x=validator.isEmail(req.body.email);
     if(x)
     {
  newsletter= {
    email:req.body.email
 
}
  news.create(newsletter)
.then(nu => {
    console.log(nu)
 res.json({
 message: "Newsletter Subscription added to" + nu.email
 })
    
    
})
.catch(err => {
 console.log(err.errmsg);
res.json({
  message:"Subscription already added for this account"
})
   
   
  })
}
else{
  res.json({
    message:"Please enter a valid email"
  })
}
}
module.exports.gethome= (req,res)=>{
let home=fs.readFileSync("./static/index.html"); 
let home1=home+" ";

res.end(home1);
}
module.exports.getteam= async(req,res)=>{
    let team=    fs.readFileSync("./templates/team/team-template.html"); 
let team1=team+" ";
let teammin=fs.readFileSync("./templates/team/team-mem-mini.html");
let teammin1=teammin+" ";
let teambig=fs.readFileSync("./templates/team/team-mem-full.html");
let teambig1=teambig + " ";
try{
    var a=" "; var b=" ";
  await teammodel.find({}).then((result)=>{
    var i;
    team=team1.replace(/{%id%}/g,result[0]["_id"]);
    team=team.replace(/{%img-min%}/g,result[0]["imagemin"]);
      team=team.replace(/{%name%}/g,result[0]["name"]);
      team=team.replace(/{%img-full%}/g,result[0]["imagebig"]);
      team=team.replace(/{%position%}/g,result[0]["position"]);
      team=team.replace(/{%desc%}/g,result[0]["description"]);
 
  for(i=1;i<result.length;i++) 
  {  let   teambig2=teambig1.replace(/{%name%}/g,result[i]["name"]);
       teambig2=teambig2.replace(/{%id%}/g,result[i]["_id"]);
 
    teambig2=teambig2.replace(/{%img-full%}/g,result[i]["imagebig"]);
    teambig2=teambig2.replace(/{%position%}/g,result[i]["position"]);
    teambig2=teambig2.replace(/{%desc%}/g,result[i]["description"]);
    b=b+teambig2;
  }
  for(i=1;i<result.length;i++)
  { let teammin2=teammin1.replace(/{%id%}/g,result[i]["_id"]);
     teammin2=teammin2.replace(/{%name%}/g,result[i]["name"]);
    teammin2=teammin2.replace(/{%img-min%}/g,result[i]["imagemin"]);
     a=a+teammin2;
  }

  team=team.replace(/{%team-mem-min-list%}/g,a);
  team=team.replace(/{%team-mem-info%}/g,b);

  res.end(team);
})
}
 catch(err){
     console.error(err);
 }  
   


};
module.exports.addteammem = async (req,res)=>{
    try{
      
   var result= await teammodel.create(req.body);
  res.status(201).json({
    result:result
  })
 }
 catch(err)
 {
   console.error(err);

 } 

};
module.exports.updateteammem=(req,res)=>{
    let id=req.params["id"];
    teammodel.findByIdAndUpdate(id,req.body,{new:true},(err,result)=>{
    if(err)
    {
      res.status(403).json({
        result:err
      })
      res.end()
    }
    res.status(201).json({
      result:result
    })
    })
};    
module.exports.removeteammem=(req,res)=>{
    let id=req.params["id"];

    teammodel.findByIdAndDelete(id).then((result)=>
    {
      res.status(201).send("Team Member Details Removed");
    }).catch((err)=>{
      console.error(err);
    })
};
module.exports.getaboutus=(req,res)=>{
    let aboutus=    fs.readFileSync("./static/aboutus.html"); 
let aboutus1=aboutus+" ";

res.end(aboutus1);
};


module.exports.getallcars= async (req,res)=>{
    var allcarpage2=fs.readFileSync('./templates/cars/cars.html');
    var allcarpage=allcarpage2+" ";
    var carcard2= fs.readFileSync('./templates/cars/car-card.html');
   var carcard=carcard2 +" ";
     try{
        var a=" "; 
      await Carmodel.find({}).then((result)=>{
        var i;
        for( i=0;i<result.length;i++)
      { 
         let carcard1=carcard.replace(/{%name%}/g,result[i]["Name"]);
        carcard1=carcard1.replace(/{%price%}/g,result[i]["Rent"]);
        carcard1=carcard1.replace(/{%img1%}/g,result[i]["img1"]);
        carcard1=carcard1.replace(/{%time%}/g,result[i]["Mph060"]);
        
        carcard1=carcard1.replace(/{%topspeed%}/g,result[i]["TopSpeed"]);
        
       
        carcard1=carcard1.replace(/{%minidesc%}/g,result[i]["minidescription"]);
        carcard1=carcard1.replace(/{%airbags%}/g,result[i]["Airbags"]);
        if(result[i]["Rating"]<5&&result[i]["Rating"]>=4)
        {
        carcard1=carcard1.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star unmark"></i>');
    }
    else if(result[i]["Rating"]<4 && result[i]["Rating"]>=3)
    {
    carcard1=carcard1.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star unmark"></i><i class="fa fa-star unmark"></i>');
}   
else if(result[i]["Rating"]==5)
{
carcard1=carcard1.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star unmark"></i><i class="fa fa-star unmark"></i>');
}
else
{
carcard1=carcard1.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star unmark"></i><i class="fa fa-star unmark"></i><i class="fa fa-star unmark"></i>');
} 
carcard1=carcard1.replace(/{%id%}/g,result[i]["id"]);

a = a+carcard1;

      }

      allcarpage1=allcarpage.replace(/{%car-templates%}/g,a);
    res.end(allcarpage1);  
    });
    
        
  res.end(allcarpage);
    }
    catch(err)
    {
        console.error(err);
    }




    }
    module.exports.getcardetails=(req,res)=>{
        let carinfo2=fs.readFileSync('./templates/cars/each-car-template.html');
        let carinfo=carinfo2+ ' ';
        let id=req.params["id"];
        Carmodel.findById(id).then((result)=>{
           
           carinfo=carinfo.replace(/{%name%}/g,result["Name"]);
            carinfo=carinfo.replace(/{%price%}/g,result["Rent"]);
            carinfo=carinfo.replace(/{%bodytype%}/g,result["Bodytype"]);
            carinfo=carinfo.replace(/{%time%}/g,result["Mph060"]);
            carinfo=carinfo.replace(/{%year%}/g,result["Year"]);
            carinfo=carinfo.replace(/{%topspeed%}/g,result["TopSpeed"]);
            carinfo=carinfo.replace(/{%transmission%}/g,result["Transmission"]);
            carinfo=carinfo.replace(/{%displacement%}/g,result["Displacement"]);
            carinfo=carinfo.replace(/{%description%}/g,result["Description"]);
            carinfo=carinfo.replace(/{%airbags%}/g,result["Airbags"]);
             carinfo=carinfo.replace(/img2/g,result["img2"]);
             carinfo=carinfo.replace(/img3/g,result["img3"]);
             carinfo=carinfo.replace(/img4/g,result["img4"]);
            if(result["Rating"]<5&&result["Rating"]>=4)
            {
            carinfo=carinfo.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
        }
        else if(result["Rating"]<4&&result["Rating"]>=3)
        {
        carinfo=carinfo.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
    }   
    else if(result["Rating"]==5)
    {
    carinfo=carinfo.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
}
else
{
    carinfo=carinfo.replace(/{%rating%}/g,'<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star unmark"></i><i class="fa fa-star unmark"></i><i class="fa fa-star unmark"></i>');
}
 
            if(result["ABS"])
            {
            carinfo=carinfo.replace(/{%abs%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%abs%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["CruiseControl"])
            {
            carinfo=carinfo.replace(/{%cruisecontrol%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%cruisecontrol%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["ClimateControl"])
            {
            carinfo=carinfo.replace(/{%climatecontrol%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%climatecontrol%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["AlloyWheels"])
            {
            carinfo=carinfo.replace(/{%alloy%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%alloy%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["PaddleShift"])
            {
            carinfo=carinfo.replace(/{%paddle%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%paddle%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["SteeringMountedControls"])
            {
            carinfo=carinfo.replace(/{%steeringmounts%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%steeringmounts%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["Ways6AdjustSeats"])
            {
            carinfo=carinfo.replace(/{%seats%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%seats%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }
            if(result["Sunroof"])
            {
            carinfo=carinfo.replace(/{%sunroof%}/g,' <i class="fas fa-2x fa-check"></i> ');
            }
            else{
                carinfo=carinfo.replace(/{%sunroof%}/g,'<i class="fas fa-2x fa-times"></i> ');
            }

           
       res.end(carinfo);
                 



        })
        .catch((err)=>{
      console.error(err);})
    };
    module.exports.addcar = async (req,res)=>{
         try{
           
        var result= await Carmodel.create(req.body);
       res.status(201).json({
         result:result
       })
      }
      catch(err)
      {
        console.error(err);
     
      } 

    };
    module.exports.updatecar=(req,res)=>{
        let id=req.params["id"];
        Carmodel.findByIdAndUpdate(id,req.body,{new:true},(err,result)=>{
        if(err)
        {
          res.status(403).json({
            result:err
          })
          res.end()
        }
        res.status(201).json({
          result:result
        })
        })
    };    
    module.exports.removecar=(req,res)=>{
        let id=req.params["id"];

        Carmodel.findByIdAndDelete(id).then((result)=>
        {
          res.status(201).send("Car Details Removed");
        }).catch((err)=>{
          console.error(err);
        })
    };
    module.exports.getcontact=(req,res)=>{
        let contactus=    fs.readFileSync("./static/contactus.html"); 
    let contactus1=contactus+" ";
    
    res.end(contactus1);
    };