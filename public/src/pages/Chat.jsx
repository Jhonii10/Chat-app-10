import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {allUsersRoute , host} from '../utils/APIRoutes'
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'


const Container = styled.div`
    
        height:100vh;
        width: 100vw;
        display:flex;
        flex-direction: column;
        justify-content: center;
        gap:1rem;
        align-items : center;
        background-color: #f0f2f5;
        .container{
            height:85vh;
            width:85vw;
            background-color: #fff;
            display:grid;
            grid-template-columns: 25% 75%;
            @media screen and (min-width:720px) and (max-width:1000px){
                grid-template-columns: 35% 65%;
            }
        }
`

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
        <Container>
            <div className='container'>
                <Contacts 
                    contacts={contacts} 
                    currentUser={currentUser}
                    changeChat={handleChatChange}    
                    />
                    {
                        currentChat === undefined
                        ? <Welcome currentUser={currentUser}/>
                        : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                    }
                
            </div>
        </Container>
        )
}

export default Chat;
