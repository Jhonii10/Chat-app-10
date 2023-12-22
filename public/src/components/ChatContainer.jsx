import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from 'uuid'
import { Avatar, Badge, Box, IconButton, ListItemText, Stack } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert'; // Assuming MoreVertIcon is desired
import VideoCallIcon from '@mui/icons-material/VideoCall'; // Replace with actual icon
import PhoneIcon from '@mui/icons-material/Phone';

const ChatContainer = ({currentChat , currentUser , socket}) => {

  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute,{
          from: currentUser._id,
          to : currentChat._id
  
         })
         setMessages(response.data)
        
      }
       
    }

    fetchData()
}, [currentChat, currentUser]);

    const handleSendMsg = async (msg)=>{
        await axios.post(sendMessageRoute,{
          from:currentUser._id,
          to:currentChat._id,
          message:msg,
        })

        socket.current.emit("send-msg",{
          to:currentChat._id,
          from:currentUser._id,
          message: msg
        })

        const msgs = [...messages]
        msgs.push({
          fromSelf: true,
          message: msg
      })

        setMessages(msgs)
    }

    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg)=>{
            setArrivalMessage({
              fromSelf:false,
              message:msg
            })
        })
      }
      
    }, [socket]);



    useEffect(() => {
      arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
    }, [arrivalMessage]);


    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        < >
            <Stack direction="row" alignItems="center" sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexShrink: 0,
                  padding: '8px 8px 8px 20px',
                  minHeight: '72px',
            }}>
                <Stack direction="row" spacing={2}>
                  <Badge badgeContent={4} color="error" invisible={true} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}>
                    <Avatar src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                  </Badge>
                  <ListItemText primary={currentChat.name} secondary="online" />
                </Stack>

                <Stack sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                }}/>

                <Stack direction="row" spacing={2}>
                  <IconButton size="medium">
                    <VideoCallIcon /> 
                  </IconButton>
                  <IconButton size="medium">
                    <PhoneIcon /> 
                  </IconButton>
                  <IconButton size="medium">
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
            </Stack>

            <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderTop: '1px solid rgba(145, 158, 171, 0.2)',
            }}
            
            >
            <Stack sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}  >
            
            <Box sx={{
              overflow: 'auto',
              padding: '40px 24px',
              height:' 100%',
            }}>
            
        {messages.map((message) => {
          return (
            
            <Stack 
              key={uuidv4()}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                ...(message.fromSelf ? {justifyContent: 'flex-end'} :{justifyContent: 'unset'}),
                marginBottom: '20px',
              }}
              >
            
              <Stack
                ref={scrollRef}                
              >
                <Stack 
                 sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px',
                  minWidth: '48px',
                  maxWidth: '320px',
                  borderRadius: '8px',
                  lineHeight: '1.57143',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  ...(message.fromSelf ? {backgroundColor: 'rgb(204, 244, 254)'} :{backgroundColor: 'rgb(244, 246, 248)'}),
                }}
                >
                  {message.message}
                </Stack>
              </Stack>
            </Stack>
          );
        })}
        </Box>
      
      <Box>
      <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
      </Stack>
      </Stack>
            
            
        </>
    );
}

export default ChatContainer;


