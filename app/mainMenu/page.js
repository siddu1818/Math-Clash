"use client"

import axios from "axios";
import { useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import { getDetails } from "../details/details";



export default function Home(){
    let details;
    const router = useRouter();

    async function userDetails(username){

        const options = {
          method: "GET",
          url: "/api/movies",
          params : {
            type: 0
          }
        };
    
        try { 
          const response = await axios.request(options);
          return response.data.stuff; // Assuming your API returns a message
        } catch (error) {
          console.error(error);
          return null;
        }
        
      }
    
    useEffect(() => {
        
        async function fetchDetails(){
            details = await getDetails();
            //console.log(details);
            let print = details.user;
            let print2 = details.score;
            document.getElementById("title").textContent = `Hello ${print}, choose a game mode`;
            document.getElementById("highscore").textContent = `Your high score is: ${print2}`;

            let allUsers = await userDetails()
            allUsers.sort((a, b) => parseInt(b.score) - parseInt(a.score));
            console.log(allUsers)

            let leaders = "";
            for(let i = 0; i< 10; i++){
                leaders += (allUsers[i].user + ": "+ allUsers[i].score)
                leaders += "<br>"
                if( i + 1 > allUsers.length - 1){
                    break;
                }
            }

            document.getElementById("leaderBoard").innerHTML = leaders;

        }

        fetchDetails();
    },[])

    function startGame1(){
        router.push("../singlePlayer");
    }

    function startGame2(){
        router.push("../multiPlayer/connect");
    }
    
    return(

        <div>
            <br></br>
            <h1 id = "title"></h1>
            <button onClick={startGame1}>Single Player</button>
            <button onClick={startGame2}>Versus</button>
            <br></br>
            <br></br>

            <h3>Your stats:</h3>
            <p id = "highscore"></p>

            <br></br>

            <h3>Top 10 Leaderboard</h3>
            <p id = "leaderBoard"></p>

        </div>


    );
}