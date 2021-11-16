const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
        allowEIO3: true
    });

const port = 8000;

server.listen(port);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/klient.html');
});


io.sockets.on('connection', function (socket) {

    console.log("Socket connected.");

    let newUser = userJoinedChat();

    io.emit('newUser', newUser);

    socket.on('message', function (msg) {
        io.emit('message', msg);
    });

});

function userJoinedChat() {
    let user = `User${Math.floor(Math.random() * 1000000)}`;
    io.emit('message', `${user} dolaczyl do czatu!`);

    return user;
}