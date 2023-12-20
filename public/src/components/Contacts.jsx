import { Avatar, Badge, Box, IconButton, InputAdornment, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Contacts = ({contacts = [] , currentUser = [] , changeChat }) => {



    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.name);
        
    }, [currentUser]);

    const changeCurrentChat = (index , contact)=>{
        setCurrentSelected(index); 
        changeChat(contact)

    }

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <>
                       <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            webkitBoxAlign: 'center',
                            alignItems: 'center',
                            webkitBoxPack: 'center',
                            justifyContent: 'center',
                            padding: '20px 20px 0px',
                       }}>
                        <Badge sx={{

                        }}>

                        <Avatar
                            src={`data:image/svg+xml;base64,${currentUserImage}`}
                            alt="Avatar"
                            variant="circular"
                            sx={{ width: 48, height: 48 }} 
                          />

                        </Badge>
                            <Box sx={{
                                flexGrow: 1,
                            }}/>
                        <IconButton
                              size="medium"
                              aria-label="Home"
                            >
                             <ArrowBackIosNewIcon/>
                          </IconButton>
                        

                        </Stack>

                        <Box sx={{
                          padding:'0px 20px 20px',
                        }}> 
                        <TextField
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Buscar Contacto..."
                          variant="outlined"
                          sx={{
                             margin:'20px 0px 0px',
                          }}
                        />
                        
                         </Box>
                        <Box sx={{
                          overflow: 'auto',
                          paddingBottom: '8px',
                        }}>
                        
                        {
                            contacts.map((contact,index)=>(
                                <ListItemButton   
                                    sx={{
                                      ...(index === currentSelected && {backgroundColor: 'rgba(145, 158, 171, 0.16)'})
                                    }}
                                    key={index}
                                    onClick={() => changeCurrentChat(index, contact)}
                                    >
                                        
                                        <Badge>
                                          <Avatar
                                              src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                              alt="Avatar"
                                              variant="circular"
                                              sx={{ width: 48, height: 48 }} 
                                            />

                                          </Badge>
                                          <ListItemText
                                            
                                            primary={ 
                                            <Typography 
                                                component={'h6'}
                                                variant='subtitle1'
                                                sx={{
                                                  textTransform:'capitalize',
                                                  ...(index === currentSelected && {fontWeight:600})
                                                }}
                                              >
                                                        {contact.name}
                                              </Typography>}
                                            sx={{
                                              flex:' 1 1 auto',
                                              minwidth: '0px',
                                              margin: '0px 0px 0px 16px',

                                            }}      
                                            />
                                  
                                </ListItemButton>
                            ))
                        }

                       
                        </Box>
                        
                        
                    </>

                )
            }
        </>
    );
}

export default Contacts;