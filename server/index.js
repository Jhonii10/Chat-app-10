const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const messageRoute = require("./routes/messagesRoute")


const app = express();
const socket = require("socket.io")
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('conectado a la base datos')
}).catch((err)=>{
    console.error(err)
})


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

console.log(process.env.MONGO_URL);



const io = socket(server, {
    cors: {
      origin: process.env.ORIGIN,

      credentials: true,
    },
    
  });

  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });