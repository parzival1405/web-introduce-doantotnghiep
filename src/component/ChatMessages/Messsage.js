import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  left: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));

function Message({ mess }) {
  const classes = useStyle();
  return (
    <div className={mess.customerId === mess.sendBy ? classes.right : classes.left}>
      <Typography variant="caption" style={{background:"#fff",padding:"5px",borderRadius:"10px",marginTop:"10px"}}>
        {mess.customerId === mess.sendBy ? `${mess.msg}:Bạn` : mess.msg}
      </Typography>
    </div>
  );
}

export default Message;
