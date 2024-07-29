const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:3001"]
    }
})

console.log("Socket.IO server is starting...");
let gameStats = {};

io.on("connection", socket => {
    console.log(socket.id)

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });

    socket.on("send-message", (message, room) =>{
        //console.log(message)
        if(room === ''){
            socket.broadcast.emit("receive-message", message)
        }
        else{
            socket.to(room).emit("receive-message", message)
        }
        
    })

    socket.on("join-room", (room, user) => {
        socket.join(room)
        if (!gameStats[room]) {
            gameStats[room] = {}; // Initialize an empty object for new rooms
        }
        socket.to(room).emit("user-joined-message", `${user} joined ${room}`)
        
    })

    socket.on("connect-timer", (room) => {
        socket.to(room).emit("connect-startTimer")
    })

    socket.on("update-leaderboard", (room, user, score) => {
        gameStats[room][user] = score;
        io.in(room).emit("print-leaderboard", gameStats[room]);
        
    })

    socket.on("end-room", (room) => {
        delete gameStats[room];
        
    })

});






