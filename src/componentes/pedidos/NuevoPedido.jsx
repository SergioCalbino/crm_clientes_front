import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import BuscarProducto from './BuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

const NuevoPedido = () => {

    const { id } = useParams();

    const [cliente, setCliente] = useState({})
    const [busqueda, setBusqueda] = useState('');
    const [productosBuscados, setProductosBuscados] = useState([])

    useEffect(() => {

        //Obtener el cliente
        const traerCliente = async () => {
            const { data } = await clienteAxios.get(`/clientes/${id}`)
            setCliente(data)
        }

        traerCliente()
      
    }, [])

    
    //Almacenar una busqueda en el state
    const leerDatosDeBusqueda =  (e) => {
        // console.log(e.target.value)
         setBusqueda(e.target.value)
    }
    
    //Esta funcion va a buscar en la base de Datos
    const buscarProducto = async (e) => {
        e.preventDefault()
        //Obtener los productos de la busquea
       
            const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${ { busqueda } }`)
            console.log(resultadoBusqueda)
            if (resultadoBusqueda.data[0]) {
                let productoResultado = resultadoBusqueda.data[0];
                //Agregar la llave "producto" { copia de id }
                productoResultado.producto  = resultadoBusqueda.data[0]._id
                productoResultado.cantidad = 0
               
                //Poner en el estate el resultado de la busqueda
                setProductosBuscados([...productosBuscados, productoResultado ])
                
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'No Resultados',
                    text: 'No hay resultados'
                })

            }

        }
            
      
            
            
        
    

  return (
    <>
         <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p> Nombre: {cliente.nombre} {cliente.apellido} </p>
                <p> Telefono: {cliente.telefono}  </p>
            </div>

            <BuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosDeBusqueda={leerDatosDeBusqueda}
            />


           

                <ul className="resumen">
                {
                    productosBuscados.map((producto, index) => {
                        return <FormCantidadProducto 
                        key={producto.producto} 
                        producto={producto}

                        />

                    })  

                }
                    
                </ul>
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                </div>
           
    </>
  )
}

export default NuevoPedido