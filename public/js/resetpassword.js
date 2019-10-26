$(".resetBtn").click(async e => {
  e.preventDefault();
  let pass = document.getElementById("newpassword").value;
  let confirmpass = document.getElementById("confirmnewpassword").value;
  const url = window.location.href;
  const purl = url.split("/")[3].split("?")[1];
  console.log(pass);

  if (pass != confirmpass) {
    alert("Password and confirm password doesnt match");
    location.reload(true);
  }

  let res = await axios.patch("/api/user/resetPassword?" + purl, {
    pass: pass,
    confirmpass: confirmpass
  });
  if (res.data == "Password has been reset") {
    alert(" Password Updated!!");
    window.setTimeout(() => {
      location.assign("/login");
    }, 1000);
  } else {
    alert("NO user present with this token");
  }
});
