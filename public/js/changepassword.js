$(".btnUpdate").click(async e => {
  e.preventDefault();
  let oldpass=document.getElementById("oldpassword").value;
  let newpass = document.getElementById("newpassword").value;
  let confirmpass = document.getElementById("confirmnewpassword").value;
  let res = await axios.patch('/api/user/updatePassword',{oldpass,newpass,confirmpass});
});
