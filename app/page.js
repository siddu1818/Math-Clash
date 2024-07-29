"use client"

import axios from "axios";
import { useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import { storeDetails } from "./details/details";



export default function Home() {

  const [cool, setCool] = useState("");
  const router = useRouter();

  async function userDetails(username){

    const options = {
      method: "GET",
      url: "/api/movies",
      params : {
        user : username,
        type: 1
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

  /*useEffect(() => {
    console.log("WOW")
    test();
  },[])*/


  let loginCounter = 0;
  let details;

  async function loggingIn(){

    if(loginCounter == 0){
      let username = document.getElementById("login").value;
      details = await userDetails(username);
      if(details == null){
        document.getElementById("loginText").textContent = "(Username not found)      Username:";
      }
      else{
        loginCounter += 1;
        document.getElementById("loginText").textContent = "Password:";
      }
      document.getElementById("login").value = "";
    }
    else if(loginCounter == 1){
      let password = document.getElementById("login").value;
      if(details.password == password){
        loginCounter += 1;
        document.getElementById("loginText").textContent = "Signed in successfully:";
        await storeDetails(details);
        router.push("/mainMenu");
      }
      else{
        document.getElementById("loginText").textContent = "(Incorrect password)      Password:";
      }
      document.getElementById("login").value = "";
    }
    
    return;
  }
  
  async function goToSignUpPage(){
    /*if (typeof window !== 'undefined') {
      window.location.href = '/signIn';
    }*/
    router.push("/signIn");
  }

  return (
    <div>
      <h1>Log In</h1>
      <p id = "loginText">Username:</p>
      <input id = "login"></input>
      <button onClick = {loggingIn}>Confirm</button>

      <br></br>
      <br></br>
      <p>Dont have an account:</p>
      <button onClick = {goToSignUpPage}>Sign Up</button>
      

    </div>
  );
}
