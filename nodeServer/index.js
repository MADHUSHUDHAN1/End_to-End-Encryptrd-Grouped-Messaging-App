//Node server which will handle socket io connections
const server = require('http').createServer();
const io = require('socket.io')(server);

const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
      socket.broadcast.emit('receive',{message: message, name: users[socket.id]})  
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
server.listen(3000,()=>{
    console.log("server is runing");
});