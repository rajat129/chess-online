let list = document.querySelector(".list");

socket.on("movepiece",function(obj){

    console.log(obj);
    let {x,y,rowid,colid} = obj;
    move(x,y,rowid,colid);
    turn = true;

})

socket.on("left",function(leftuser){
    document.querySelector(`div[id="${leftuser.id}"]`).remove();
})

socket.on("online-list",function(userlist){
    
    list.innerHTML = ``;
    for(let i=0;i<userlist.length;i++){
        if(userlist[i].id!=socket.id){

            
            let joindiv = document.createElement("div");
            joindiv.classList.add("active-players");
            joindiv.setAttribute("id",userlist[i].id);
            joindiv.innerHTML = userlist[i].username;
            list.append(joindiv);

        }
    }

    let activeplayer = document.querySelectorAll(".active-players");

    for(let i=0;i<activeplayer.length;i++){

        activeplayer[i].addEventListener("click",function(e){
            let id = e.target.id;
            socket.emit("leave",id);
            socket.emit("leave",socket.id);
            startgame();
            socket.emit("startgame",id);
        })
    
    }

})

socket.on("joined",function(userobj){

    let joindiv = document.createElement("div");
    joindiv.classList.add("active-players");
    joindiv.setAttribute("id",userobj.id);
    joindiv.innerHTML = userobj.username;
    list.append(joindiv);

    let activeplayer = document.querySelectorAll(".active-players");

    for(let i=0;i<activeplayer.length;i++){

        activeplayer[i].addEventListener("click",function(e){
            let id = e.target.id;
            socket.emit("leave",id);
            socket.emit("leave",socket.id);
            startgame();
            socket.emit("startgame",id);
        })
    
    }

})

socket.on("left1",function(id){
    
    document.querySelector(`div[id="${id}"]`).remove();
})

socket.on("startspecific",function(id){
    startgame();
})

function startgame(){
    sidebar.classList.add("hide");
    heading.classList.add("hide");
    chessboard.classList.remove("hide");
}