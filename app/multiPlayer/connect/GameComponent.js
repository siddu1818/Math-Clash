import { useEffect, useState } from "react";
import axios from "axios";

function GameComponent({ socket, room, details, user, router }) {
    const [score, setScore] = useState(0);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operation, setOperation] = useState("");

    useEffect(() => {
        socket.on("print-leaderboard", (gameStats) => {
            printLeaderboard(gameStats);
        });

        socket.emit("update-leaderboard", room, user, score);
        generate();
        timer();

        return () => {
            socket.off("print-leaderboard");  // Always clean up listeners when the component unmounts
        };
    }, []);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const checkAns = () => {
        let correctAns = 0;
        const userAns = document.getElementById("userAns").value;

        switch (operation) {
            case "+":
                correctAns = num1 + num2;
                break;
            case "-":
                correctAns = num1 - num2;
                break;
            case "*":
                correctAns = num1 * num2;
                break;
            case "/":
                correctAns = Math.floor(num1 / num2);
                break;
        }
        console.log(correctAns);

        if (userAns == correctAns) {
            document.getElementById("userAns").value = "";
            let pointsToAdd = 0;

            switch (operation) {
                case "+":
                case "-":
                    pointsToAdd = 1;
                    break;
                case "*":
                    pointsToAdd = 4;
                    break;
                case "/":
                    pointsToAdd = 3;
                    break;
            }

            setScore((prevScore) => {
                const newScore = prevScore + pointsToAdd;
                socket.emit("update-leaderboard", room, user, newScore);
                return newScore;
            });
            console.log(score)
            generate();
        }
    };

    const generate = () => {
        setNum1(getRandomInt(-100, 100));
        setNum2(getRandomInt(-100, 100));
        const operationArr = ["+", "-", "*", "/"];
        setOperation(operationArr[getRandomInt(0, 3)]);
    };

    async function update(u, p, s){
        const options = {
          method: "PUT",
          url: "/api/movies",
          data: {
            user : u,
            password : p,
            score : s
          }
        };
    
        try { 
          const response = await axios.request(options);
          //console.log(response.data)
          return;
        } catch (error) {
          console.error(error);
          return null;
        }
          
        
    }

    const timer = () => {
        let sec = 30;
        const timer = setInterval(() => {
            document.getElementById('timer').textContent = `00:${sec}`;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                document.getElementById("outputOperation").textContent = "Game Over";
                setScore((currentScore) => {
                    document.getElementById("score").textContent = `Your final score is: ${currentScore}`;

                    if (currentScore > Number(details.score)) {
                        update(details.user, details.password, currentScore);
                        details.score = currentScore.toString();
                    }
                    socket.emit("end-room", room);
                    cleanupGame();
                    
                    return currentScore;  // Return the same score as no further update needed
                });
            }
        }, 1000);
    };

    const cleanupGame = () => {
        const elementsToRemove = ['skip', 'userAns'];
        elementsToRemove.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.remove();
            }
        });
    };

    const goMainMenu = () => {
        router.push("../mainMenu");
    };

    const skip = () => {
        generate();
    };

    function printLeaderboard(scores) {

        let scoresArray = Object.entries(scores);
        scoresArray.sort((a, b) => b[1] - a[1]);
        console.log(scoresArray);

        let leaders = "";
        for(let i = 0; i< scoresArray.length; i++){
            leaders += (scoresArray[i][0] + ": "+ scoresArray[i][1])
            leaders += "<br>"
        }


        document.getElementById("leaderboard").innerHTML = leaders;
    }

    return (
        <div>
            <p id="outputOperation">{num1} {operation} {num2}</p>
            <input id="userAns" onInput={checkAns}></input>
            <button id="skip" onClick={skip}>Skip</button>
            <p id="score">Score: {score}</p>
            <p id="timer">00:30</p>
            <button onClick={goMainMenu}>Main Menu</button>
            <br></br>
            <p>Leaderboard</p>
            <p id="leaderboard"></p>
        </div>
    );
}

export default GameComponent;
