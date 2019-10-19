
$('#btn-review').click(function (event) {
   console.log("INSIDE SUBMIT");
    // Don't follow the link
    event.preventDefault();
  
    const fName = document.getElementById("firstName").value;
    const lName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const jobtitle = document.getElementById("JobTitle").value;
    
    const reviewbody = document.getElementById("reviewbody").value;
    const contact = document.getElementById("tel").value;
    console.log("values added");
    axios.post("/api/review", {
      fName: fName,
      lName: lName,
      email: email,
     jobtitle: jobtitle,
      reviewbody:reviewbody,
      contact:contact
    })
      .then(response => {
          console.log("response");
             console.log("response review");
        $("#checkname").text(response.data.message);
        if(response.data.color=="red")
        {
         $("#checkname").css("color","red");
        }
        else
        {
          $("#checkname").css("color","green");
        }
        $("#checkname").animate({ opacity: 1 });
         
        setTimeout(function () { $("#checkname").animate({ opacity: 0 });$("#checkname").css("display", 'hidden');
    if(response.data.color=="green")
    {
        window.setTimeout(() => {
            location.assign("/team#testimonials");
          }, 500);
    }
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