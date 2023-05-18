import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  Paper,
  TextField,
  TextareaAutosize,
  Typography,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Message from "./ChatMessages/Messsage";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },

  button: {
    position: "absolute !important",
    bottom: "0",
    right: "0",
  },
}));

export default function BasicSpeedDial({ socket, customerId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [isChat, setIsChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleCreateConversation = () => {
    setIsChat(true);
    handleSendMessage();
  };

  const handleSendMessage = () => {
    if (msg.trim()) {
      socket.current.emit(
        "sendMessage",
        JSON.stringify({ customerId: customerId, name: name, msg: msg })
      );
      setMessages((prev) => [
        ...prev,
        {
          customerId: customerId,
          name: name,
          msg: msg,
          sendBy: customerId,
        },
      ]);
      setMsg("");
    }
  };

  useEffect(() => {
    socket?.current?.on("customerReceiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => 
      socket?.current.off("customerReceiveMessage");
  });

  const handleChangeText = (event) => {
    setMsg(event.target.value);
  };

  return (
    <Box>
      <div role="presentation" className={classes.root}>
        {open && (
          <Fade in={open}>
            <Paper style={{ marginBottom: "50px", borderRadius: "10px" }}>
              <Box
                style={{
                  width: "300px",
                  height: "400px",
                  background: "#ffd",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Typography align="center" style={{ marginBottom: "10px" }}>
                  Tư vấn khám bệnh
                </Typography>
                {!isChat ? (
                  <>
                    <Box style={{ width: "100%", marginBottom: "10px" }}>
                      <Typography>Nhập tên của bạn*</Typography>
                      <TextField
                        value={name}
                        size="small"
                        style={{ marginRight: "5px", width: "100%" }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Box>
                    <Box
                      style={{ width: "100%", flex: 1, marginBottom: "10px" }}
                    >
                      <Typography>Tin nhắn*</Typography>
                      <TextField
                        style={{ width: "100%" }}
                        multiline
                        rows={8}
                        maxRows={10}
                        onChange={handleChangeText}
                      />
                    </Box>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      startIcon={<Send />}
                      onClick={
                        isChat ? handleSendMessage : handleCreateConversation
                      }
                    >
                      Gửi
                    </Button>
                  </>
                ) : (
                  <>
                    <Box style={{ width: "100%", flex: 1 }}>
                      {messages?.map((item, index) => (
                        <Message key={index} mess={item} />
                      ))}
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextField
                        value={msg}
                        size="small"
                        style={{ marginRight: "5px" }}
                        onChange={handleChangeText}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        startIcon={<Send />}
                        onClick={handleSendMessage}
                      >
                        Gửi
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Paper>
          </Fade>
        )}
        <Button
          className={classes.button}
          onClick={handleClick}
          style={{ background: "#1da1f2", color: "#fff", width: "100px" }}
        >
          tư vấn
        </Button>
      </div>
    </Box>
  );
}
