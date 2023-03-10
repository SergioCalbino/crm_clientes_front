import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner.js'
import Producto from './Producto'
import { useNavigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'


const Productos = () => {

    const [auth, setAuth ] = useContext(CRMContext)
    const [productos, setProductos] = useState([])
    const navigate = useNavigate()

    
    useEffect(() => {
     
        //Query a la api
        if (auth.token !== '') {
        const consultarApi = async () => {
          try {
            const { data } = await clienteAxios.get('/productos', {
              headers: {
                Authorization: `Bearer ${auth.token} `
              }
            })
                setProductos(data)
            
          } catch (error) {
              if (error.response.status === 500) {
                navigate('/iniciar-sesion')
                
              }
          }

        
        }
        consultarApi()
      } else {
        navigate('/iniciar-sesion')
      }
    }, [productos])
    
    
    if (auth.auth ===  false) {
      navigate('/iniciar-sesion')
      
    }
  
    //Spinner de carga
    if(!productos.length) return <Spinner />

  return (
    <>
    <h2>Productos</h2>
   

      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
          Nuevo Producto
      </Link>

      <ul className="listado-productos">
         {
            productos.map(producto => {
                return <Producto key={producto._id} {...producto} />

            })
         }
          
          
      </ul>
    </>
  )
}

export default Productos