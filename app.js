const express = require("express");

// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// app.get("/",function(reques,response){
//   response.send("welcome to home page");
// })

let userlist = [];
let socketlist = [];
let opponentlist = [];

io.on('connection', (socket) => {

  socket.on("userconnected" , function(username){

    let obj = {
      username:username,
      id : socket.id
    }

    socketlist[socket.id] = socket;
    userlist.push(obj);
    socket.emit("online-list",userlist);
    socket.broadcast.emit("joined",obj);
  })

  socket.on("startgame",function(id){
    opponentlist[id] = socket.id;
    opponentlist[socket.id] = id;
    socketlist[id].emit("startspecific",id);
  })

  socket.on("move",function(obj){
    let reqsocketid = opponentlist[socket.id];
    let reqsocket = socketlist[reqsocketid];
    reqsocket.emit("movepiece",obj);
  }) 

  socket.on("leave",function(id){
    let rem = userlist.filter(function(userobj){
      if(userobj.id==id){
        return false;
      }else{
        return true;
      }
    })
    userlist = rem;
    socket.broadcast.emit("left1",id);
  })

  socket.on("disconnect",function(){
    let leftuser;
    let rem = userlist.filter(function(userobj){
      if(userobj.id==socket.id){
        leftuser = {id:socket.id,username:userobj.username};
        return false;
      }else{
        return true;
      }
    })
    userlist = rem;
    socket.broadcast.emit("left",leftuser);
  })

});

let port = process.env.PORT || 3000;

server.listen(port,function(){
  console.log("app started");  
})