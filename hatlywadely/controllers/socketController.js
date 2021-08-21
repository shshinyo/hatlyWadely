const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on("connection", socket => {
  console.log(socket.id)
   socket.on("message",data=>{
     console.log(data)
     socket.broadcast.emit("messagefromapi",data)
   })
  });
  http.listen(3000, () => {
    console.log('Listening on port 3000');
  });