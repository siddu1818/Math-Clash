"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getDetails, storeSocket } from "../../details/details";
import { useRouter } from 'next/navigation';
import Swap from "./swap";

let socket;

export default function Home() {
  const [details, setDetails] = useState(null); // Use state to store user details
  const [room, setRoom] = useState(null); // Use state to store room
  const [timerDone, setTimerDone] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const fetchedDetails = await getDetails();
      setDetails(fetchedDetails); // Set user details to state
      //console.log(fetchedDetails);
    }

    getUser();

    if (!socket) { // Initialize socket only once
      socket = io("http://localhost:3000");
      //console.log(socket);
      storeSocket(socket);
    }

    return () => {
      if (socket) { // Clean up socket connection on component unmount
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  if (!details) { // Render loading state until details are fetched
    return <div>Loading...</div>;
  }

  // Pass socket, room, details, user, and router to the Swap component
  return (
    <Swap
      socket={socket}
      room={room}
      setRoom={setRoom}
      details={details}
      user={details.user}
      router={router}
      timerDone={timerDone}
      setTimerDone={setTimerDone}  // Pass setTimerDone to manage the state from Swap
    />
  );
}
