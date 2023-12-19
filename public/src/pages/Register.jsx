import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f0f2f5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #1877f2;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #559bf4;
      outline: none;
    }
  }
  button {
    background-color: #1877f2;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #006fff;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      margin-left:10px
    }
  }
`;



const Register = () => {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (handleValidation()) {
            const {name , email, password} = values;
            const {data} = await axios.post(registerRoute, {
                name,
                email,
                password
            } )
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                toast.done('usuario creado', toastOptions)
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }

            

        }
      }
      
      const handleChange = (e)=>{
          setValues({...values , [e.target.name]: e.target.value})
          
      }

      const toastOptions = {

            position:'bottom-right',
            autoClose:5000,
            pauseOnHover:true,
            draggable:true,
            theme:'dark'
    
      }

      const handleValidation = ()=>{

            const {name , email, password, confirmPassword} = values;

            if (!name || !email || !password || !confirmPassword) {
                toast.error('Todos los campos son obligatorios', toastOptions);
                return false;
            }

            if (name.length < 3) {
                toast.error('El nombre debe tener mas de 2 caracteres',toastOptions)
                return false
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            toast.error('El formato del correo electrónico no es válido', toastOptions);
            return false;
            }

            const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
            if (!strongPasswordRegex.test(password)) {
                toast.error('La contraseña debe contener al menos 6 caracteres, una letra, un número y un carácter especial.', toastOptions);
                return false;
            }

            if(password !== confirmPassword) {
                toast.error('Las contraseñas no coinciden',toastOptions)
                return false
            }
           
           return true
            
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
         navigate('/')
        }
     }, [navigate]);


    
    return (
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='brand'>
                    <img src='/assets/logojhoni.svg' alt='logo'/>
                    <h1>JNR10</h1>

                </div>
                <input type='text' placeholder='Nombre' name='name' onChange={(e)=>handleChange(e)}/>
                <input type='email' placeholder='Correo electronico' name='email' onChange={(e)=>handleChange(e)}/>
                <input type='password' placeholder='Contraseña ' name='password' onChange={(e)=>handleChange(e)}/>
                <input type='password' placeholder='Confirmacion de contraseña' name='confirmPassword' onChange={(e)=>handleChange(e)}/>
                <button type='submit'>Crear usuario</button>
                <span>
                    Ya tengo una cuenta 
                    <Link to={'/login'}>
                        <span>
                             Iniciar sesión
                        </span>
                    </Link>
                </span>

            </form>
            <ToastContainer />
        </FormContainer>
    );
}

export default Register;
