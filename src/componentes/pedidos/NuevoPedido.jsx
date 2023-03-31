import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';
import BuscarProducto from './BuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

const NuevoPedido = () => {

    const { id } = useParams();
    const navigate = useNavigate()
   

    const [cliente, setCliente] = useState({})
    const [busqueda, setBusqueda] = useState('');
    const [productosBuscados, setProductosBuscados] = useState([])
    const [total, setTotal] = useState(0)
   

    const [ auth, setAuth ] = useContext(CRMContext);
   

    
    useEffect(() => {

        //Obtener el cliente

        const traerCliente = async () => {
            const { data } = await clienteAxios.get(`/clientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token} `
                  }
            })
            setCliente(data)
        }

        traerCliente()
      acutalizarTotal()
    }, [productosBuscados])

    
    //Almacenar una busqueda en el state
    const leerDatosDeBusqueda =  (e) => {
        // console.log(e.target.value)
         setBusqueda(e.target.value)
    }

    //Actulizar la cantidad de los productos
    const restarProductos = (index) => {
       //copiar el arreglo original
       const todosProductos = [...productosBuscados]
       if (todosProductos[index].cantidad === 0) return;
       
       todosProductos[index].cantidad --

       //Almacenar en el estate
       setProductosBuscados(todosProductos)
    };
    
    const sumarProductos = (index) => {
        const todosProductos = [...productosBuscados]
    
        todosProductos[index].cantidad ++
 
        //Almacenar en el estate
        setProductosBuscados(todosProductos)

    };

    //Eliminar producto 
    const eliminarProductoPedido =  (id) => {

        console.log(productosBuscados)
        const todosProductos = productosBuscados.filter( producto => producto._id !== id )
       

        setProductosBuscados(todosProductos)
        

        

    }

    //Actulizar el total a pagar
    const acutalizarTotal = () => {
        if (productosBuscados.length === 0) {
            setTotal(0);
            return
        }
        // calcular el nuevo total
        let nuevoTotal = 0;

        //Recorrer todos los productos y cantidades y precios
        productosBuscados.map( producto => nuevoTotal += (producto.cantidad * producto.precio ))

        //Almacenar en el estate
        setTotal(nuevoTotal)
    }
    
    //Esta funcion va a buscar en la base de Datos
    const buscarProducto = async (e) => {
        e.preventDefault()
        
        //Obtener los productos de la busquea
       
            const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`, {
                headers: {
                    Authorization: `Bearer ${auth.token} `
                  }
             })
           
           
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

        };

        //Almacena el pedido en la base de datos

        const realizarPedido = async (e) => {
            e.preventDefault();

            //Extraer el id del cliente para el pedido - esta arriba

            //Construit el objeto para almacenar en la DB
            const pedido = {
                cliente: id,
                pedido: productosBuscados,
                total: total

            }
            console.log(pedido)
            
            const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido );
            console.log(resultado)
            if (resultado.status === 200) {
                //Todo ok
                Swal.fire({
                    type: 'succes',
                    title: 'correcto',
                    text: resultado.data.msj
                })
                navigate('/pedidos')
            } else {
                //Error
                Swal.fire({
                    type: 'error',
                    title: 'No Resultados',
                    text: 'Vuelva a intentarlo'
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
                        restarProductos={restarProductos}
                        sumarProductos={sumarProductos}
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}

                        />

                    })  

                }
                    
                </ul>
               <p className='total' >Total a Pagar: <span>$ {total} </span> </p>
               {
                total > 0 ? (
                    <form onSubmit={realizarPedido} >
                        <input type="submit" 
                                className='btn btn-verde btn-block'
                                value="Realizar Pedido"

                        />
                    </form>
                ) : null
               }
           
    </>
  )
}

export default NuevoPedido