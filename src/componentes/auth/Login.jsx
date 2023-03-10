import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'



const Login = () => {

    //Auth y Token

    const [auth, setAuth ] = useContext(CRMContext)
    console.log(auth)

    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({})


    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })

    }

    //Iniciar sesion en el servidor
    const handleSubmit = (e) => {
        e.preventDefault();

        clienteAxios.post('/iniciar-sesion', usuario)
        .then(({ data }) => {
            const token = data.token
            localStorage.setItem('token', token)
            //Colocarlo en el State
            setAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión',
                'success'
            )
            //Redireccionar
            navigate('/');
        })
        .catch((error) => {
            // console.log(error)
            if (error.response) {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error'
                })

            }
        });
        
    }

  return (

    <div className='login' >
        <h2>Iniciar Sesion</h2>

        <div>
            <form onSubmit={handleSubmit} >
                <div className='campo' >
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='Email para iniciar sesion'
                        required
                        onChange={ handleChange }
                    />

                </div>
                <div className='campo' >
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password para iniciar sesion'
                        required
                        onChange={ handleChange }
                    />

                </div>
                <input type='submit' value='Iniciar Sesion' className='btn btn-verde btn-block'  />  
            </form>
        </div>

    </div>

  )
}

export default Login