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
