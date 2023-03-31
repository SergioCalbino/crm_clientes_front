import React from 'react'

const DetallePedidos = (props) => {

    const { pedido } = props
   
    const { cliente } = pedido
    


  return (
   <>
    <li class="pedido">
                    <div class="info-pedido">
                        <p class="id">ID: { cliente._id }</p>
                        <p class="nombre">Cliente: {cliente.nombre} {cliente.apellido} </p>
    
                        <div class="articulos-pedido">
                            <p class="productos">Artículos Pedido: </p>
                            <ul>
                            {
                                pedido.pedido.map(pedido => (
                                <li>
                                    <p>Nombre: {pedido.producto.nombre}</p>
                                    <p>Precio: ${ pedido.producto.precio }</p>
                                    <p>Cantidad: {pedido.cantidad}</p>
                                </li>

                                ))
                            }
                               
                            </ul>
                        </div>
                        <p class="total">Total: ${pedido.total} </p>
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
   </>
  )
}

export default DetallePedidos