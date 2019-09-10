const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
const server = app.listen(1337, () => console.log("suhhhhh dude 1337"));
const io = require('socket.io')(server);
let color = "white";

io.on('connection', function(socket) { //..................................2
    const broadcastColor = () => {
        let output = {
            colorLatest: color,
        };
        io.emit('update', output);
    }
    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //..........3
    socket.on('thankyou', function(data) { //........................7
        console.log(data.msg); //.......................8
        broadcastColor();
    });
    socket.on("red", function() {
        color = "red";
        broadcastColor();
    });
    socket.on("yellow", function() {
        color = "yellow";
        broadcastColor();
    });
    socket.on("green", function() {
        color = "green";
        broadcastColor();
    });

});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.render('index');
});
