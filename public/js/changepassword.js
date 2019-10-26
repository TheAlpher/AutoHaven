console.log("gggg");
$(".btnUpdate").click(async e => {
  e.preventDefault();
    console.log("ggggxxxxx");
  let oldpass = document.getElementById("oldpassword").value;
  let newpass = document.getElementById("newpassword").value;
  let confirmpass = document.getElementById("confirmnewpassword").value;
  let res = await axios.patch("/api/user/updatePassword", {
    oldpass,
    newpass,
    confirmpass
  });
  if (res.data.status == "user Password Updated") {
    alert("password updated");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1000);
  } else if (res.data == "password is wrong") {
    alert("password is wrong");
  } else {
    alert("User not logged in");
  }
});
