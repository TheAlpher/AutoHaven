$('.contactenquiry').click(function (event) {
     console.log("esfislfj;sfsf");
    // Don't follow the link
    event.preventDefault();
  
    // Log the clicked element in the console
    var x = document.querySelector('#contactname').value
    var y = document.querySelector('#contactemail').value
    var z = document.querySelector('#contactmsg').value
  
    console.log(x + " " + y + " " + z );
    axios.post("/api/contactenquiry", {
      name: x,
      email: y,
      message:z
    })
      .then(response => {
        console.log(response);
        $("#checkname").text(response.data.message);
        $("#checkname").animate({ opacity: 1 });
  
        setTimeout(function () { $("#checkname").animate({ opacity: 0 }) }, 2000);
        $("#checkname").css("display", 'hidden');
  
  
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