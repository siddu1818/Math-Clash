import MessageComponent from './MessageComponent';
import GameComponent from './GameComponent';

function Swap({ socket, room, setRoom, details, user, router, timerDone, setTimerDone }) {
    return (
        timerDone 
        ? <MessageComponent socket={socket} room={room} setRoom={setRoom} user={user} setTimerDone={setTimerDone} /> 
        : <GameComponent socket={socket} room={room} details={details} user={user} router={router} />
    );
}

export default Swap;
