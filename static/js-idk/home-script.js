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
function heightset(class1,class2)
{   $(document).ready(function(){


     var element1=document.querySelectorAll(class1);
    var element2=document.querySelector(class2);
       element1.forEach((element)=>{
        $(element).css('height',$(element2).height());
        console.log($(element2).height());
        console.log($(element).height());
       })
     
    })
     
    
}
function heightset2(class1,class2)
{   $(document).ready(function(){


     var element1=document.querySelectorAll(class1);
    var element2=document.querySelector(class2);
       
        $(element1).css('height',$(element2).height());
        console.log($(element2).height());
        console.log($(element).height());
     
     
    })
     
    
}
// heightset(".crossfade-figure",".hometop");
// heightset(".crossfade1-figure",".our-services");
heightset2("figure",".whybest");
heightset(".flipper",".each-service-logo");
heightset(".flipcontainer",".each-service-logo");

function marginset(class1,class2)
{   $(document).ready(function(){


     var element1=document.querySelectorAll(class1);
    var element2=document.querySelector(class2);
       element1.forEach((element)=>{
        var eleh=$(element2).height();
        $(element).css('margin-top',(-1.2*eleh));
        console.log($(element2).height());
        console.log($(element).css('margin-top'));
       
       })
     
    })
     
    
}
/* ....................................*/
$(document).ready(()=>{
    var element4=document.querySelector(".form-container");
var element3=document.querySelector(".our-services");
var element1=document.querySelector(".carousel-container");
var element2=document.querySelector(".form-innercontainer");
 $(element2).css('margin-top',-0.8*$(element2).height()); 
$(element4).css('min-height',$(element2).height());
// $(element4).css('margin-bottom',$(element2).height());

 $(element3).css('margin-top',$(element4).height());


})
/* ....................................*/
marginset(".each-service-desc-desc",".each-service-logo");

function animate1(elementclass,animation1 )
{
var element3 = document.querySelectorAll(elementclass);
var element4 = document.querySelector('.init');
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
$(function () {
  $('#datetimepicker1').datetimepicker();
});