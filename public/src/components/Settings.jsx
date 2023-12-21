import React, { useState } from 'react';
import {
    Divider,
    IconButton,
    ListItemText,
    MenuItem,
    Popover,
    Select,
    Stack,
  } from '@mui/material';

  import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Settings = ({open ,  handleCloseLogout ,  currentUserName}) => {

    const [status, setStatus] = useState('online');

    const navigate = useNavigate();
    const handleClick = async()=>{
        await localStorage.clear();
        navigate('/login')
    }
   
    return (
        <Popover 
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseLogout}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
            sx: {
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 204,
                overflow:'inherit',
                backdropFilter:'blur(20px)',
                backgroundColor:'rgba(255, 255, 255, 0.75)',
                '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
                },
            },
            }}
            
            >
      
         <Stack sx={{ 
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'center',
            padding: '16px 8px 16px 20px',
            }}>
            <ListItemText primary={currentUserName}  secondary={status}/>
                <IconButton
                 sx={{
                    '& svg':{ color:'red'}
                 }}
                 onClick={handleClick}
                >
                    <Icon icon={'quill:off'} />
                </IconButton>
         </Stack>
            <Divider/>
            <Stack>
            <MenuItem sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                minHeight: '48px',
                padding: '6px 8px',
                borderRadius: '6px',
            }}>
            <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
                position: 'relative',
                cursor: 'text',
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                paddingLeft: '16px',
            }}  
          >
            <option value="online">online</option>
            <option value="alway">always</option>
            <option value="busy">busy</option>
            <option value="offline">offline</option>
          </Select>

          </MenuItem>

            </Stack>
        
       
    </Popover>
    );
}

export default Settings;
