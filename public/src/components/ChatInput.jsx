import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import {BsEmojiSmileFill} from 'react-icons/bs'
import { Box, IconButton, InputAdornment, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; 


const ChatInput = ({handleSendMsg}) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () =>{
          setShowEmojiPicker(!showEmojiPicker);

    }

    const handleEmojiClick = (emojiObject) =>{
            let message = msg;
            message += emojiObject.emoji;
            setMsg(message);

    }

    const sendChat = (event)=>{
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }

    }


    return (
        <Box>
            <form onSubmit={sendChat}>
            <InputBase
            components={'div'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '8px',
                    paddingRight: '24px',
                    height: '56px',
                    flexShrink: 0,
                    borderTop: '1px solid rgba(145, 158, 171, 0.2)',
                }}
                startAdornment={
                    <InputAdornment sx={{
                        cursor:'pointer' ,
                        '&& svg':{marginRight:'12px'}, 
                        '&& .EmojiPickerReact':{
                            position: 'absolute',
                            top: '-440px',    
                            boxShadow:' 0 5px 10px #1877f2',
                            borderColor: '#9a86f3',
                        }
                    }}>
                    <>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                                {
                                    showEmojiPicker &&
                                    <Picker onEmojiClick={handleEmojiClick} />
                                }
                    </>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton edge="end" type='submit'>
                        <SendIcon />
                    </IconButton>
                    </InputAdornment>
                }
                placeholder="Type a message"
                onChange={(e)=>setMsg(e.target.value)}
                value={msg}
                /> 
                </form>
</Box>
    );
}

export default ChatInput;


