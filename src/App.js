import React, { useEffect, useRef } from "react";
import BodyPage from "./component/BodyPage";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { Box } from "@mui/material";
import InfoPage from "./component/InfoPage";
import BasicSpeedDial from "./component/BasicSpeedDial";
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from 'uuid';
import { io } from "socket.io-client";
function App() {
  const socket = useRef();

  let customerId = localStorage.getItem("customerId");

  if (!customerId) {
    customerId = uuidv4()
    localStorage.setItem("customerId",customerId);
  } 

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_URL_SERVER_SOCKET,{
      query: {
        id: customerId,
        role: "KHACH_HANG",
      },
    });

    return () => {
      socket.current.close();
    }
  });

  return (
    <Box>
      <Header/>
      <InfoPage />
      <BodyPage socket={socket} customerId={customerId}/>
      <Footer />
      <BasicSpeedDial socket={socket} customerId={customerId}/>
    </Box>
  );
}


export default App;
