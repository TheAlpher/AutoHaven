let loginbtn = document.getElementsByClassName("btn-login");
let signupbtn = document.getElementsByClassName("btn-signup");
// console.log(loginForm);
// console.log(logoutBtn);

 $(signupbtn).click(function(e) {
   e.preventDefault();
   const fName = document.getElementById("firstName").value;
   const lName = document.getElementById("lastName").value;
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   const confirmPassword = document.getElementById("confirmpassword").value;
   const address = document.getElementById("address").value;
   const contact = document.getElementById("tel").value;
   signup(fName, lName, email, password, confirmPassword, address, contact);
 });

 $(loginbtn).click(function(e) {
    e.preventDefault();
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    login(email, password);
  });

const login = async (email, password) => {
  // alert("Email :" + email + "   " + "Password " + " : " + password);
  try {
    const data = {
      email,
      password
    };
    const res = await axios.post("/api/user/login", data);
    console.log(res.data);
    if (res.data.status === "user logged in") {
      alert("User logged in ");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert(res.data);
    }
  } catch (err) {
    console.log(err);
  }
};

const signup = async (fName,lName, email, password, confirmPassword,address,contact) => {
  // alert("Email :" + email + "   " + "Password " + " : " + password);
  console.log("inside signup fn");
  try {
    const data = {
      fName,
      lName,
      email,
      password,
      confirmPassword,
      address,
      contact
    };
    const res = await axios.post("/api/user/signup", data);
    console.log(res.data);
    if (res.data.status === "user Signedup") {
      alert("User SignedUp");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert(res.data.status);
    }
  } catch (err) {
    console.log(err);
  }
};
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
