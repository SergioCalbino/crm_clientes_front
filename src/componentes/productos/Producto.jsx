import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'



const Producto = ({ _id, imagen, nombre, precio }) => {

  

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Un producto eliminado no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {

        //Eliminar Producto
        clienteAxios.delete(`/productos/${id}`)
          .then(res => {
            if (res.data === 200) {
              Swal.fire(
                'eliminado!',
                res.data.mensaje,
                'success'
              )
              
            }
          })

      }
    })

  }

  return (
    <li className="producto">
    <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio} </p>
       {
        imagen ?  <img src={`http://localhost:5000/${imagen}`} alt={nombre} /> : null
       }
    </div>
    <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
            <i class="fas fa-pen-alt"></i>
            Editar Producto
        </Link>

        <button 
            type="button" 
            className="btn btn-rojo btn-eliminar"
            onClick={() => handleDelete(_id)}
            >
            <i class="fas fa-times"></i>
            Eliminar Cliente
        </button>
    </div>
</li>
  )
}

export default Producto