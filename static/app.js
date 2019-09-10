$(document).ready(function (){
    var socket = io(); //..................................1

    let redPush = document.getElementById("red"); //based on id of button
    let yellowPush = document.getElementById("yellow"); //based on id of button
    let greenPush = document.getElementById("green"); //based on id of button

    socket.on('greeting', function (data) { //.......................4
        console.log(data.msg); //.........................5
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

    redPush.addEventListener("click", function() {
        console.log("RED");
        socket.emit("red");
    });

    yellowPush.addEventListener("click", function() {
        console.log("YELLOW");
        socket.emit("yellow");
    });

    greenPush.addEventListener("click", function() {
        console.log("GREEN");
        socket.emit("green");
    });

    socket.on('update', function(output) {
        document.body.style.backgroundColor = output.colorLatest;
    });
});