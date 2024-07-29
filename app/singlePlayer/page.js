"use client"

import axios from "axios";
import { useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import { storeDetails, getDetails } from "../details/details";



export default function Home(){

    const router = useRouter();
    var num1, num2, operation;
    var score = 0;

    function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function checkAns(){
        var correctAns = 0;
        var userAns = document.getElementById("userAns").value;

        switch(operation){
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
        //console.log(correctAns);
        if(userAns == correctAns){
            document.getElementById("userAns").value = "";
            switch(operation){
                case "+":
                    score += 1;
                    break;
                case "-":
                    score += 1;
                    break;
                case "*":
                    score += 4;
                    break;
                case "/":
                    score += 3;
                    break;
    
            }
            document.getElementById("score").textContent = `Score:` + score;
            generate();
        
        }

    }

    function generate(){
        num1 = getRandomInt(-100, 100);
        num2 = getRandomInt(-100, 100);
        var operationArr = ["+", "-", "*", "/"];
        var i = getRandomInt(0, 3);
        operation = operationArr[i];
        var question = num1 + "  " + operation + "  " + num2;

        var outputOperation = document.getElementById("outputOperation");
        outputOperation.textContent = question;
    }


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

    async function timer(){
        var sec = 30;
        var timer = setInterval(async function(){
            document.getElementById('timer').textContent= `00:${sec}`;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                document.getElementById("outputOperation").textContent = "Game Over";
                document.getElementById("score").textContent = `Your final score is: ${score}`;
                var elem = document.getElementById('skip');
                if (elem && elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                    
                }

                let details = await getDetails()
                if(score > Number(details.score)){
                    score = "" + score;
                    await update(details.user, details.password, score);
                    details.score = score;
                    storeDetails(details);
                }

                elem = document.getElementById('userAns');
                if (elem && elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                    
                }
                
            }
        }, 1000);
    }

    function goMainMenu(){
        router.push("../mainMenu");
    }

    function skip(){
        generate();
    }

    useEffect(() => {
        
        generate();
        timer();

    },[])


    //oninput="checkAns()"
    return(

        <div>

            <p id="outputOperation"></p>

            <input id="userAns" onInput={checkAns}></input>
            <button id = "skip" onClick={skip}>Skip</button>

            <p id = "score">Score: 0</p>

            <p id="timer" onLoad={timer}>00:30</p>

            <button onClick={goMainMenu}>Main Menu</button>


        </div>



    );
}