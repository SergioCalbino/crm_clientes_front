
import { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'
import DetallePedidos from './DetallePedidos'

const Pedidos = () => {

  const [pedidos, setPedidos] = useState([])

    const[auth, setAuth] = useContext(CRMContext)

    
    useEffect(() => {
      
      consultarApi()

    }, [])
    
    const consultarApi = async () => {
      //Obtener los pedidos
      const traerPedidos = await clienteAxios.get(`/pedidos`, {
         headers: {
          Authorization: `Bearer ${auth.token} `
        }
      })
      setPedidos(traerPedidos)
      console.log(traerPedidos)
    }


  return (
    <>
    <h2>Pedidos</h2>


            <ul class="listado-pedidos">
            {
                pedidos.data?.map(pedido => (
                    <DetallePedidos
                        key={pedido._id}
                        pedido={pedido}


                    />

                ))
            }
               
            </ul>
            </>
  )
}

export default Pedidos