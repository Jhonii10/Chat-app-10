/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {allUsersRoute , host} from '../utils/APIRoutes'
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'
import {Box, Card, Stack} from '@mui/material';
import ThemeProvider from '../themes';


const Chat = () => {

    const socket = useRef();

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login')
            }else{
                setCurrentUser( await JSON.parse(localStorage.getItem('chat-app-user')))
            }

        }
        fetchData()
    }, [navigate]);

    // socket
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit("add-user",currentUser._id)
        }
    }, [currentUser]);


    useEffect(() => {

        const fetchData = async () => {

            if (currentUser) {
                if (currentUser?.isAvatarImageSet) {
                    
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    
                    if (data.data) {
                        setContacts(data.data)
                    }
                    
                }else{
                    navigate('/setAvatar')
                }
                
            }
        }

        fetchData()
    }, [currentUser, navigate]);

    const handleChatChange = (chat)=>{
        setCurrentChat(chat)
        
    }
    

    return (
        <ThemeProvider>
        <Box sx={{
            backgroundColor:'rgb(245, 245, 245)'
        }}>
        <Box 
            component={'main'} 
            sx={{
            
                flexGrow : 1,
                minHeight: '100%',
                display: 'flex',
                flexDirection:'column',
                padding: {xs:'28px 12px', md:'68px 68px'},
            }}
        >
        <Card 
            elevation={0}
            rounded={true}
            component={'div'}
            sx={{
                display:'flex',
                flexDirection: 'row',
                boxShadow:'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                backgroundColor:'rgb(255, 255, 255)',
                color:'rgb(33, 43, 54)',
                transition:'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                borderRadius:'16px',
                height:{xs:'92vh',md:'82vh'}
            }}
        >
               
                <Contacts 
                    contacts={contacts} 
                    currentUser={currentUser}
                    changeChat={handleChatChange}    
                />

                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}>
                    {
                        currentChat === undefined
                        ? <Welcome currentUser={currentUser}/>
                        : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                    }
                </Stack>
           
        
        </Card>
        </Box>
        </Box>
        </ThemeProvider>
        )
}

export default Chat;
