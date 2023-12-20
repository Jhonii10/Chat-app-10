import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    const handleClick = async()=>{
        await localStorage.clear();
        navigate('/login')
    }


    return (
        <Button onClick={handleClick}>
            Cerrar seccion
        </Button>
    );
}

export default Logout;


const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #1877f2;
  border: none;
  cursor: pointer;
  color:white;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;