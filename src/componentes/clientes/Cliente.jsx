import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import clienteAxios from "../../config/axios"


const Cliente = ({_id, nombre, apellido, empresa, email, telefono }) => {

    const onDelete = (id) => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Un Cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
            
          }).then((result) => {
            if (result.isConfirmed) {
              
              //Llamar a la APi para borrar
              clienteAxios.delete(`/clientes/${id}`)
                .then(res => {
                    Swal.fire(
                        'Eliminado!',
                        res.data.mensaje,
                        'success'
                    )
                })
                
            }
          })
    }

  return (
    <li className="cliente">
    <div className="info-cliente">
        <p className="nombre">{nombre}</p>
        <p className="apellido">{apellido}</p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>Tel: {telefono}</p>
    </div>
    <div className="acciones">
       <Link to={`/clientes/editar/${_id}`} className="btn btn-azul" >
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
        </Link>
       <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo" >
            <i className="fas fa-plus"></i>
           Nuevo Pedido
        </Link>
        
        <button 
            type="button" 
            className="btn btn-rojo btn-eliminar"
            onClick={() => onDelete(_id)}
        
        >
            <i className="fas fa-times"></i>
            Eliminar Cliente
        </button>
    </div>
</li>
  )
}

export default Cliente