

let location1={x: 28.6476, y: 77.1181};
$('#newbooking').click(function (event) {
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
       location:location1,
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
          $("#checkname1").animate({ opacity: 1 });
          
          setTimeout(function () { $("#checkname1").animate({ opacity: 0 });$("#checkname1").css("display", 'hidden');
 
      }, 2000);
         }
         else
         {
           $("#checkname1").css("color","green");
           document.getElementById('newbooking').classList.add('disabled');
           document.getElementById('newbooking').innerHTML='Booked';
           $("#checkname1").animate({ opacity: 1 });
          
           setTimeout(function () { $("#checkname1").animate({ opacity: 0 });$("#checkname1").css("display", 'hidden');
  
       }, 2000);
        
           window.setTimeout(() => {
            location.assign("/me");
          }, 500);  }
        
 
   
   
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
      
       $("#checkemail").text(response.data.message);
       if(response.data.color=="red")
       {
        $("#checkemail").css("color","red");
       }
       else
       {
         $("#checkemail").css("color","yellow");

       }
       $("#checkemail").animate({ opacity: 1 });
   
       setTimeout(function () { $("#checkemail").animate({ opacity: 0 }) }, 2000);
       $("#checkemail").css("display", 'hidden');
     })
   
   });









 
   
      function initMap() {

 

var map;
var latitude;
var longitude;
var markers=[];

function toggleBounce() {
if (marker.getAnimation() !== null) {
marker.setAnimation(null);
} else {
marker.setAnimation(google.maps.Animation.BOUNCE);
}
}
           


var myLatLng = {lat: 28.6476, lng: 77.1181};
var myRadius=40000;
map = new google.maps.Map(document.getElementById('map'), {
center: myLatLng,
zoom: 8.5,
disableDoubleClickZoom: true,
mapTypeId:google.maps.MapTypeId.HYBRID ,// disable the default map zoom on double click
disableDefaultUI: true
});
var myCircle= new google.maps.Circle({
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  map: map,
  center: myLatLng,
  radius:myRadius
});

placeMarkerAndPanTo1(myLatLng, map);
function setMapOnAll(map) {
  for (var i = 1; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
// map.addListener('click', function(e){
//   let x=e.latLng.lat();
//   let y=e.latLng.lng();
//   let a=check(x,y);
//   console.log(a);
// if(a==true)
// {    console.log("awda");
//     setMapOnAll(null);
//   placeMarkerAndPanTo(e.latLng,map);
// }
//   else{
//     document.getElementById('mapcheck').value="We dont server here yet";
//      console.log("dwaudkhakwd")
//   }
  
// });
// myCircle.addListener('click', function(e){
//   let x=e.latLng.lat();
//   let y=e.latLng.lng();
//   let a=check(x,y);
//   console.log(a);
// if(a==true)
// {    console.log("awda");
//     setMapOnAll(null);
//   placeMarkerAndPanTo(e.latLng,map);
// }
//   else{
//     document.getElementById('mapcheck').value="We dont server here yet";
//      console.log("dwaudkhakwd")
//   }
  
// });
map.addListener('click',function(e){
  $('#mapcheck').css('color','red');
  $('#mapcheck').text("Sorry, We dont serve here yet");

})

myCircle.addListener('click',function(e){

  setMapOnAll(null);
placeMarkerAndPanTo(e.latLng,map);
location1.x=e.latLng.lat();
location1.y=e.latLng.lng();
  $('#mapcheck').css('color','green');
  $('#mapcheck').text("We are available here");

})




// function check(x,y)
// {
//   function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
//     var R = 6378.137; // Radius of earth in KM
//     var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
//     var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c;
//     console.log("inner d"+ d)
//     return d * 1000; // meters
// }
// let d=measure(myLatLng.lat,myLatLng.lng,x,y);
// console.log(d);
// if (d<myRadius/2)
// {
// return true;
// }

// return false;
// }



function placeMarkerAndPanTo(latLng, map) {
var marker = new google.maps.Marker({
  position: latLng,
  map: map
});


markers.push(marker);
map.panTo(latLng);
}

function placeMarkerAndPanTo1(latLng, map) {
  var icon1={
    url:"../img/home/marker.svg",
    scaledSize:new google.maps.Size(50,50),
    origin: new google.maps.Point(0,0)
  }
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon:icon1
  });
  
  
  markers.push(marker);
  map.panTo(latLng);
  }
  



}

