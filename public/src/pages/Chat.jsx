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
import {Box, Card, Stack} from '@mui/material'

// const Container = styled.div`
    
//         height:100vh;
//         width: 100vw;
//         display:flex;
//         flex-direction: column;
//         justify-content: center;
//         gap:1rem;
//         align-items : center;
//         background-color: #f0f2f5;
//         .container{
//             height:85vh;
//             width:85vw;
//             background-color: red;
//             display:grid;
//             grid-template-columns: 25% 75%;
//             @media screen and (min-width:720px) and (max-width:1000px){
//                 grid-template-columns: 35% 65%;
//             }
//         }
// `




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
                padding: '68px 68px',
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
                height:'82vh'
            }}
        >
               <Stack 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    flexshrink: 0,
                    width: '320px',
                    borderRight: '1px solid rgba(145, 158, 171, 0.2)',
                    transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

                }}
               
               >
                <Contacts 
                    contacts={contacts} 
                    currentUser={currentUser}
                    changeChat={handleChatChange}    
                    />
                </Stack>

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
        )
}

export default Chat;
