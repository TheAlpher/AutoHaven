
    
  $('.click-me-2').click( function async(event) {

// Don't follow the link
event.preventDefault();
error=[];
// Log the clicked element in the console
var x= document.querySelector('#newsletter-email').value
// if(!x) {
//   error.push('please enter email')
//   inner
// }
// <div id="adjad" style="display:none">"Please enter a valid email" </div>


// if(error.length ==0)
// {

// }
axios.post("/api/newsletter",{
 email:x
}).then(response=>{
    console.log(response);
    $("#checkemail").text(response.data.message);
    
    $("#checkemail").animate({opacity:1});

  })



  

});

function animate1(elementclass,animation1 )
{
var element3 = document.querySelectorAll(elementclass);
var element4 = document.querySelector('nav');
window.addEventListener('scroll', function(event) {
  element3.forEach(element => {
    var wintop     = $(window).scrollTop();
    var winheight=$(window).height();
    var winbottom= wintop+winheight;
    console.log(winbottom);
    const navheight=$(element4).height();
    var eletop = $(element).offset().top;
    var eleheight=$(element).height();
    var elebottom=eletop + eleheight;
    console.log(elebottom);
      if(eletop>(wintop-eleheight) && elebottom<(winbottom+eleheight))
     { element.style.opacity=1;
      $(element).addClass(animation1); 
      
      
      //  console.log("yes");
    }
     else
     
    {  
   
      element.style.opacity=0;
       
      $(element).removeClass(animation1);

      //  console.log($(window).width());
      //   console.log("no");
      }

})
});
}
animate1('.vision-title', 'animated fadeInRight');
animate1('.vision-desc','animated fadeInLeft');
