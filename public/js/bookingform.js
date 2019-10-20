
$('.newbooking').click(function (event) {
    console.log("inside booking")
     // Don't follow the link
     event.preventDefault();
   
     const fName = document.getElementById("firstName").value;
     const lName = document.getElementById("lastName").value;
     const email = document.getElementById("email").value;
     const carbrand = document.getElementById("carbrand").value;
     const carmodel = document.getElementById("carmodel").value;
     const carrent = document.getElementById("carrent").value;
     const contact = document.getElementById("tel").value;
     const location = document.getElementById("picklocation").value;
     const date = document.getElementById("date").value;
     const days= document.getElementById("days").value;
     console.log("checkname type= "+typeof($('#checkname').text()));
     const carinfo= $('#checkname').text();
     console.log("values added");
     axios.post("/api/booking", {
       fName: fName,
       lName: lName,
       email: email,
       carbrand:carbrand,
       carmodel:carmodel,
       carrent:carrent,
       location:location,
       date:date,
       days:days,
       contact:contact,
       carinfo:carinfo
     })
       .then(response => {
           console.log(response);
              console.log("response review");
         $("#checkname1").text(response.data.message);
         if(response.data.color=="red")
         {
          $("#checkname1").css("color","red");
         }
         else
         {
           $("#checkname1").css("color","green");
         }
         $("#checkname1").animate({ opacity: 1 });
          
         setTimeout(function () { $("#checkname1").animate({ opacity: 0 });$("#checkname1").css("display", 'hidden');
     }, 2000);
         
 
   
   
       })
   });
   $('.click-me-2').click(function async(event) {
 
     // Don't follow the link
     event.preventDefault();
     error = [];
     // Log the clicked element in the console
     var x = document.querySelector('#newsletter-email').value
     // if(!x) {
     //   error.push('please enter email')
     //   inner
     // }
     // <div id="adjad" style="display:none">"Please enter a valid email" </div>
   
   
     // if(error.length ==0)
     // {
   
     // }
     axios.post("/api/newsletter", {
       email: x
     }).then(response => {
       console.log(response);
       $("#checkemail").text(response.data.message);
       if(response.data.color=="red")
       {
        $("#checkemail").css("color","red");
       }
       else
       {
         $("#checkemail").css("color","green");
       }
       $("#checkemail").animate({ opacity: 1 });
   
       setTimeout(function () { $("#checkemail").animate({ opacity: 0 }) }, 2000);
       $("#checkemail").css("display", 'hidden');
     })
   
   });