import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap: 1rem;
    align-item:center;
    background-color: #131324;
    .brand{
        display:flex;
        align-item:center;
        gap:1rem;
        justify-content:center;
        img{
            height: 5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;

        }

    }
    form{
        display:flex;
        flex-direction:column;
        gap: 2rem;
        background-color:#00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding:1rem;
            border:0.1rem solid;
        } 

    }



`;

const handleSubmit = (e)=>{
  e.preventDefault();
  alert('funcion el formulario');
}

const handleChange = (e)=>{
    console.log(e.target.value);
}

const Register = () => {
    return (
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='brand'>
                    <img src='/assets/logojhoni.svg' alt='logo'/>
                    <h1>JNR10</h1>

                </div>
                <input type='text' placeholder='Nombre' name='username' onChange={(e)=>handleChange(e)}/>
                <input type='email' placeholder='Correo electronico' name='email' onChange={(e)=>handleChange(e)}/>
                <input type='password' placeholder='Contraseña ' name='password' onChange={(e)=>handleChange(e)}/>
                <input type='password' placeholder='Confirmacion de contraseña' name='password2' onChange={(e)=>handleChange(e)}/>
                <button type='submit'>Crear usuario</button>
                <span>
                    Ya tengo una cuenta 
                    <Link to={'/'}>
                        <span>
                             Iniciar sesión
                        </span>
                    </Link>
                </span>

            </form>
        </FormContainer>
    );
}

export default Register;
