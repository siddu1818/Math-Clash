import {init} from "../../../lib/mongo/testDB"
import { NextResponse } from "next/server";




export async function GET(request) {
  // Do whatever you want
  const users = await init();
  
  
  if(request.nextUrl.searchParams.get("type") == 1){
    const user = request.nextUrl.searchParams.get("user");
    const find = await users.findOne({user : user});

    return NextResponse.json({ find });
  }

  //console.log("working")
  const usersCursor = users.find();
  const stuff = await usersCursor.toArray();
  //console.log(stuff)
  return NextResponse.json({ stuff }, { status: 200 });
}

export async function POST(request) {
  console.log("running");
  try {
      const data = await request.json();
      //console.log(data);
      const users = await init();
      await users.insertOne(data);
      
      return new NextResponse(JSON.stringify({ success: true}), {
          status: 201,  
          headers: {
              'Content-Type': 'application/json'
          }
      });
  } catch (error) {
      // Handle any errors that might occur during the operation
      return new NextResponse(JSON.stringify({ success: false, message: error.message }), {
          status: 500,  // HTTP status code 500 for "Internal Server Error"
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }
}


export async function PUT(request){
  //console.log("running");
  try {
      const data = await request.json();
      const users = await init();
      const updateUser = {user: data.user};
      const updateScore = { $set: {score: data.score} };
      await users.updateOne(updateUser, updateScore);
      
      return new NextResponse(JSON.stringify({ success: true}), {
          status: 201,  
          headers: {
              'Content-Type': 'application/json'
          }
      });
  } catch (error) {
      // Handle any errors that might occur during the operation
      return new NextResponse(JSON.stringify({ success: false, message: error.message }), {
          status: 500,  // HTTP status code 500 for "Internal Server Error"
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }
}



/*export async function getUser(request){
  const users = await init();
  const usersCursor = users.find();
  const stuff = await usersCursor.toArray();
  

  return NextResponse.json({ stuff }, { status: 200 });


  const { user } = await request.json();
  const users = await init();
  console.log(user);
  const find = await users.findOne({user : user})
  return await find.toArray();
}*/





/*export async function GET(request) {
  // Do whatever you want
  const movies = await init();
  const moviesCursor = movies.find();
  const stuff = await moviesCursor.toArray();
  

  return NextResponse.json({ stuff }, { status: 200 });
}*/







/* app/api/route.js 👈🏽

import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "fuck World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}*/