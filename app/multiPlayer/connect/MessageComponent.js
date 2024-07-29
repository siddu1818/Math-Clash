import { useEffect, useState } from "react";

function MessageComponent({ socket, room, setRoom, user, setTimerDone }) {
    const [messageChat, setMessageChat] = useState("");

    useEffect(() => {
        const handleConnect = () => {
            setMessageChat(prev => `${prev}You connected with id: ${socket.id} <br>`);
        };

        const handleMessage = (message) => {
            setMessageChat(prev => `${prev}${message} <br>`);
        };

        const handleUserJoined = (message) => {
            setMessageChat(prev => `${prev}${message} <br>`);
        };

        let handleStartTimerOnce = 0;
        const handleStartTimer = () => {
            if (handleStartTimerOnce === 0) {
                socket.emit("connect-timer", room, user);
                startTimer();
                handleStartTimerOnce++;
            }
        };

        // Attach event listeners
        socket.on("connect", handleConnect);
        socket.on("receive-message", handleMessage);
        socket.on("user-joined-message", handleUserJoined);
        socket.on("connect-startTimer", handleStartTimer);

        // Cleanup
        return () => {
            socket.off("connect", handleConnect);
            socket.off("receive-message", handleMessage);
            socket.off("user-joined-message", handleUserJoined);
            socket.off("connect-startTimer", handleStartTimer);
        };
    }, [socket, room, user]);

    const sendMessage = () => {
        const message = document.getElementById("message-input").value;
        setMessageChat(prev => `${prev}${message} <br>`);
        document.getElementById("message-input").value = "";
        socket.emit("send-message", message, room);
    };

    const joinRoom = () => {
        const roomValue = document.getElementById("room-input").value;
        setRoom(roomValue);
        setMessageChat(prev => `${prev}${user} joined ${roomValue} <br>`);
        socket.emit("join-room", roomValue, user);
    };

    const startTimer = () => {
        let sec = 10;
        const timer = setInterval(() => {
            document.getElementById("timer").textContent = `Game starting in 00:${sec}`;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                setTimerDone(false);
            }
        }, 1000);
    };

    let startGameOnce = 0;
    const startCountDown = () => {
        if (startGameOnce === 0) {
            socket.emit("connect-timer", room, user);
            startTimer();
            startGameOnce++;
        }
    };

    return (
        <div id="message-container">
            <label htmlFor="message-input">Message</label>
            <input id="message-input"></input>
            <button onClick={sendMessage}>Send</button>
            <br></br>

            <label htmlFor="room-input">Room</label>
            <input id="room-input"></input>
            <button onClick={joinRoom}>Join</button>
            <br></br>

            <button id="startGame" onClick={startCountDown}>Start Game</button>
            <p id="timer"></p>
            <br></br>

            <p>Chat:</p>
            <p id="chat" dangerouslySetInnerHTML={{ __html: messageChat }}></p>
        </div>
    );
}

export default MessageComponent;
