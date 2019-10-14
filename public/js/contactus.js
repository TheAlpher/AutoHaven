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
