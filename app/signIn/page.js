"use client"

import axios from "axios";
import { useEffect, useState} from "react";
import { useRouter } from 'next/navigation';



export default function Home() {

    const router = useRouter();

    async function userDetails(username){

        const options = {
          method: "GET",
          url: "/api/movies",
          params : {
            user : username,
            type : 1
          }
        };
    
        try { 
          const response = await axios.request(options);
          //console.log(response.data.find)
          return response.data.find; // Assuming your API returns a message
        } catch (error) {
          console.error(error);
          return null;
        }
        
    }



    async function post(username, pass){

        const options = {
          method: "POST",
          url: "/api/movies",
          data: {
            user : username,
            password : pass,
            score : "0"
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



    async function makeAccount(){
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let user = document.getElementById("user");
        let pass = document.getElementById("pass");


        if(user.value == ""){
            username.textContent = "(Please enter a username)   Username:";
            password.textContent = "Password:";
            user.value = "";
            pass.value = "";
            return;
        }
        if(pass.value == ""){
            username.textContent = "Username:";
            password.textContent = "(Please enter a password)     Password:";
            user.value = "";
            pass.value = "";
            return;
        }

        
        let details = await userDetails(user.value);
        if(details != null){
            username.textContent = "USERNAME TAKEN         Username:";
            password.textContent = "Password:";
            user.value = "";
            pass.value = "";
            return;
        }
        else{
            await post(user.value, pass.value);
            router.push("..");
        }


    }


    return(

        <div>

            <h1>Sign In</h1>

            <p id = "username">Username</p>
            <input id = "user"></input>
            <p id = "password">Password</p>
            <input id = "pass"></input>

            <br></br>
            <br></br>
            <button onClick={makeAccount}>Confirm</button>


        </div>


    );
}