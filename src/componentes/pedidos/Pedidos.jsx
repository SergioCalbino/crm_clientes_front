
import { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

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
                <li class="pedido">
                    <div class="info-pedido">
                        <p class="id">ID: 0192019201291201</p>
                        <p class="nombre">Cliente: Juan Pablo De la torre</p>
    
                        <div class="articulos-pedido">
                            <p class="productos">Artículos Pedido: </p>
                            <ul>
                                <li>
                                    <p>Macbook Pro</p>
                                    <p>Precio: $3000</p>
                                    <p>Cantidad: 4</p>
                                </li>
                                <li>
                                    <p>Macbook Pro</p>
                                    <p>Precio: $3000</p>
                                    <p>Cantidad: 4</p>
                                </li>
                                <li>
                                    <p>Macbook Pro</p>
                                    <p>Precio: $3000</p>
                                    <p>Cantidad: 4</p>
                                </li>
                            </ul>
                        </div>
                        <p class="total">Total: $3,500 </p>
                    </div>
                    <div class="acciones">
                        <a href="#" class="btn btn-azul">
                            <i class="fas fa-pen-alt"></i>
                            Editar Pedido
                        </a>

                        <button type="button" class="btn btn-rojo btn-eliminar">
                            <i class="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
                <li class="pedido">
                    <div class="info-pedido">
                        <p class="id">ID: 0192019201291201</p>
                        <p class="nombre">Cliente: Juan Pablo De la torre</p>

                        <div class="articulos-pedido">
                            <p class="productos">Artículos Pedido: </p>
                            <ul>
                                <li>
                                    <p>Macbook Pro</p>
                                    <p>Precio: $3000</p>
                                    <p>Cantidad: 4</p>
                                </li>
                                <li>
                                    <p>Macbook Pro</p>
                                    <p>Precio: $3000</p>
                                    <p>Cantidad: 4</p>
                                </li>
                            </ul>
                        </div>
                        <p class="total">Total: $3,500 </p>
                    </div>
                    <div class="acciones">
                        <a href="#" class="btn btn-azul">
                            <i class="fas fa-pen-alt"></i>
                            Editar Pedido
                        </a>

                        <button type="button" class="btn btn-rojo btn-eliminar">
                            <i class="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
                <li class="pedido">
                    <div class="info-pedido">
                        <p class="id">ID: 0192019201291201</p>
                        <p class="nombre">Cliente: Juan Pablo De la torre</p>
    
                        <div class="articulos-pedido">
                            <p class="productos">Artículos Pedido: </p>
                            <ul>
                                <li>
                                    <p>Macbook Pro</p>
                                    <p>Precio: $3000</p>
                                    <p>Cantidad: 4</p>
                                </li>
                            </ul>
                        </div>
                        <p class="total">Total: $3,500 </p>
                    </div>
                    <div class="acciones">
                        <a href="#" class="btn btn-azul">
                            <i class="fas fa-pen-alt"></i>
                            Editar Pedido
                        </a>

                        <button type="button" class="btn btn-rojo btn-eliminar">
                            <i class="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
            </ul>
            </>
  )
}

export default Pedidos