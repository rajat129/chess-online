let heading = document.querySelector(".heading");
let enter = document.querySelector(".enter");

let username;
let sidebar = document.querySelector(".sidebar");
let enterbtn = document.querySelector(".btn");
let input = document.querySelector(".input")

enterbtn.addEventListener("click",function(e){
    username = input.value;
    console.log(username);
    sidebar.classList.remove("hide");
    socket.emit("userconnected",username);
    enter.classList.add("hide");
})



