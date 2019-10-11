
// var element1=document.querySelectorAll(".services");
// var element2=document.querySelector(".each-service-logo");
// var sheight=$(element2).height();
// console.log(sheight);
// console.log("a");
// window.addEventListener('load',(event)=>{


// element1.forEach(element=>{

//   element.style.height=2*sheight;
//   console.log("a");
// });
// });

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
    $("#checkemail").animate({ opacity: 1 });

    setTimeout(function () { $("#checkemail").animate({ opacity: 0 }) }, 2000);
    $("#checkemail").css("display", 'hidden');
  })

});

$('.click-me').click(function (event) {

  // Don't follow the link
  event.preventDefault();

  // Log the clicked element in the console
  var x = document.querySelector('#name').value
  var y = document.querySelector('#picklocation').value
  var z = document.querySelector('#tel').value
  var w = document.querySelector('#pickcar').value
  console.log(x + " " + y + " " + z + " " + w);
  axios.post("/api/booking", {
    name: x,
    location: y,
    telephone: z,
    pickcar: w
  })
    .then(response => {
      console.log(response);
      $("#checkname").text(response.data.message);
      $("#checkname").animate({ opacity: 1 });

      setTimeout(function () { $("#checkname").animate({ opacity: 0 }) }, 2000);
      $("#checkname").css("display", 'hidden');


    })
});



$(window).ready(function () {
  setTimeout(function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('body').style.display = 'block';
    function heightset(class1, class2) {


      var element1 = document.querySelectorAll(class1);
      var element2 = document.querySelector(class2);
      element1.forEach((element) => {
        $(element).css('height', $(element2).height());

      })




    }
    function heightset2(class1, class2) {


      var element1 = document.querySelectorAll(class1);
      var element2 = document.querySelector(class2);

      $(element1).css('height', $(element2).height());






    }
    // heightset(".crossfade-figure",".hometop");
    // heightset(".crossfade1-figure",".our-services");
    heightset2("figure", ".whybest");
    heightset(".flipper", ".each-service-logo");
    heightset(".flipcontainer", ".each-service-logo");

    function marginset(class1, class2) {


      var element1 = document.querySelectorAll(class1);
      var element2 = document.querySelector(class2);
      element1.forEach((element) => {
        var eleh = $(element2).height();
        $(element).css('margin-top', (-1.2 * eleh));




      })


    }
    /* ....................................*/
    function heightchange(class1, class2, class3, class4) {
      var element4 = document.querySelector(class1);
      var element3 = document.querySelector(class2);
      var element1 = document.querySelector(class3);
      var element2 = document.querySelector(class4);
      $(element4).css('max-height', $(element2).height());
      $(element4).css('min-height', $(element2).height());
      $(element2).css('margin-top', -0.3 * $(element2).height());

      // $(element4).css('margin-bottom',$(element2).height());

      $(element3).css('margin-top', 3 * $(element4).height());

    }
    heightchange(".form-container", ".our-services", ".carousel-container", ".form-innercontainer");

    /* ....................................*/
    marginset(".each-service-desc-desc", ".each-service-logo");

    function animate1(elementclass, animation1) {
      var element3 = document.querySelectorAll(elementclass);
      var element4 = document.querySelector('.init');
      window.addEventListener('scroll', function (event) {
        element3.forEach(element => {
          var wintop = $(window).scrollTop();
          var winheight = $(window).height();
          var winbottom = wintop + winheight;

          const navheight = $(element4).height();
          var eletop = $(element).offset().top;
          var eleheight = $(element).height();
          var elebottom = eletop + eleheight;

          if (eletop > (wintop - eleheight) && elebottom < (winbottom + eleheight)) {
            element.style.opacity = 1;
            $(element).addClass(animation1);


          }
          else {

            element.style.opacity = 0;

            $(element).removeClass(animation1);

            //  console.log($(window).width());
            //   console.log("no");
          }

        })
      });


    }
    function animate1cardwrapper(elementclass, animation1) {
      var element3 = document.querySelectorAll(elementclass);
      
      window.addEventListener('scroll', function (event) {
        element3.forEach(element => {
          var wintop = $(window).scrollTop();
          var winheight = $(window).height();
          var winbottom = wintop + winheight;

     
          var eletop = $(element).offset().top;
          var eleheight = $(element).height();
          var elebottom = eletop + eleheight/3;

          if (eletop > (wintop - eleheight) && elebottom < (winbottom + eleheight)) {
            element.style.opacity = 1;
            $(element).addClass(animation1);


          }
          else {

            element.style.opacity = 0;

            $(element).removeClass(animation1);

            //  console.log($(window).width());
            //   console.log("no");
          }

        })
      });


    }
    animate1cardwrapper('.cardwrapper','animated zoomInUp');
    animate1('.mobile-app','animated fadeInRight');
    animate1('.app-promo-info','animated fadeInLeft');
  }, 1000);

})



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

