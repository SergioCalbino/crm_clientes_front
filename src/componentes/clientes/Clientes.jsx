import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios' //Tiene el metodo de axios y el http donde hace la consulta
import Cliente from './Cliente'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../layout/Spinner.js'
import { CRMContext } from '../../context/CRMContext'



const Clientes = () => {

  const navigate = useNavigate()

  const [clientes, setClientes] = useState([])

  //Utilziar valores del contet

  const [ auth, setAuth ] = useContext(CRMContext);

  
  useEffect(() => {
    if (auth.token !== '') {
      consultarApi()
    } else {

      navigate('/iniciar-sesion')
    }
    
  }, [clientes])

 
  //Query a la Api
  const consultarApi = async () => {
    try {
      const { data }  = await clienteAxios.get('/clientes', {
        headers: {
          Authorization: `Bearer ${auth.token} `
        }
      })
     
      setClientes(data.clientes)
    } catch (error) {
      //Error con autorizacion
      if (error.response.status === 500) {
        navigate('/iniciar-sesion')
        
      }
      
    }

  }

  if (auth.auth ===  false) {
    navigate('/iniciar-sesion')
    
  }

  
  if(!clientes.length) return <Spinner />
  return (
    <>
        <h1>Clientes</h1>

        <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
          Nuevo Cliente
        </Link>

      <ul className='listado-clientes'>
          {
            clientes?.map((cliente) => ( //Es un return la ()
              <Cliente key={cliente._id} {...cliente}  /> 
            ))}
      </ul>

    </>
  )
}


export default Clientes