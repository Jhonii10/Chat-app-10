import { Drawer, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import ContactHeader from './ContactHeader';

const Contacts = ({contacts = [] , currentUser = [] , changeChat }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [open, setOpen] = useState(null);


    useEffect(() => {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.name);
        
    }, [currentUser]);

    const changeCurrentChat = (index , contact)=>{
        setCurrentSelected(index); 
        changeChat(contact)

    }

    const handleOpen = (event) => {
      setOpen(event.currentTarget);
  };
  
  const handleClose = () => {
      setOpen(null);
  };

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <>
                    <IconButton size="medium" aria-label="Solar Button"
                    onClick={handleOpen}
                    sx={{
                      display: {xs:'inline-flex', md:'none'},
                      left: '0px',
                      top: '84px',
                      zIndex: 9,
                      width: '32px',
                      height: '32px',
                      position: 'absolute',
                      borderRadius: '0px 12px 12px 0px',
                      backgroundColor: 'rgb(7, 141, 238)',
                      boxShadow: 'rgba(7, 141, 238, 0.24) 0px 8px 16px 0px',
                      color: 'rgb(255, 255, 255)',
                    }}  
                >
                      <Icon icon={'fluent-mdl2:connect-contacts'} width={24} height={24} />
                    </IconButton>

                    {
                      <Drawer
                      open={Boolean(open)}
                      onClose={handleClose}
                      anchor='left'
                      >
                      <ContactHeader 
                            changeCurrentChat={changeCurrentChat} 
                            contacts={contacts}
                            currentSelected={currentSelected}
                            currentUserImage={currentUserImage}
                            handleClose={handleClose}
                            currentUserName = {currentUserName}
                         />

                      </Drawer>
                    }

                    <Stack 
                sx={{
                    display: {xs:'none', md:'flex'},
                    flexDirection: 'column',
                    height: '100%',
                    flexshrink: 0,
                    width: '320px',
                    borderRight: '1px solid rgba(145, 158, 171, 0.2)',
                    transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    

                }}>
                        <ContactHeader 
                            changeCurrentChat={changeCurrentChat} 
                            contacts={contacts}
                            currentSelected={currentSelected}
                            currentUserImage={currentUserImage}
                            handleClose={handleClose}
                            currentUserName = {currentUserName}
                         />
                         
                        </Stack> 
                    </>

                )
            }
        </>
    );
}

export default Contacts;