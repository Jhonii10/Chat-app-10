import React from 'react';
import styled from 'styled-components';


const Welcome = ({currentUser}) => {
    return (
        <Container>
            <img  src='/assets/logojhoni.svg' alt='logo'/>
            <h1>
                Bienvenido <span>{currentUser?.name}</span>
            </h1>
            <h3>Seleccione un chat para comenzar a enviar mensajes.</h3>
        </Container>
    );
}

export default Welcome;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  min-height: 82vh;
  img {
    height: 12rem;
  }
  span {
    color: rgb(204, 244, 254);
  }
  h3{
    text-align: center;
  }
`;