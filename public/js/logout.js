let logoutBtn = document.getElementById("logout");
 console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

 const logout = async () => {
   try {
     const res = await axios.get("/api/user/logout");
     // console.log(res);
     if (res.data.status === "user logged Out") {
       alert("User logged Out ");
       window.setTimeout(() => {
         location.assign("/");
       }, 1000);
     }
   } catch (err) {
     console.log(err);
   }
 };

 if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

