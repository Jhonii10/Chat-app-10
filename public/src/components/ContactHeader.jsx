import { Avatar, Badge, Box, IconButton, InputAdornment, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Settings from './Settings';
import ScrollBar from './scrollbar/ScrollBar';

const ContactHeader = ({currentUserImage, contacts, currentSelected , changeCurrentChat, handleClose , currentUserName  }) => {
    const isSmallScreen = window.innerWidth < 899;
    const [open, setOpen] = useState(null);
    
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
      };
    
      const handleCloseLogout = () => {
        setOpen(null);
      };

    return (
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

                          }}
                          
                          >

                          <Avatar
                              src={`data:image/svg+xml;base64,${currentUserImage}`}
                              alt="Avatar"
                              variant="circular"
                              sx={{ width: 48, height: 48 }}
                              onClick={handleOpen}
                            />
                    

                          </Badge>

                          <Settings open={open} handleCloseLogout={handleCloseLogout} currentUserName = {currentUserName}/>






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
                          <ScrollBar>
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
                                      onClick={() => {changeCurrentChat(index, contact); isSmallScreen && handleClose() }}
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
                          </ScrollBar>
            
        </>
    );
}

export default ContactHeader;
