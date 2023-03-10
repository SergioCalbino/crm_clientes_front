import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import clienteAxios from "../../config/axios"
import spinner from "../layout/Spinner"




const EditarProducto = () => {

  //Obtener el ID
  const { id } = useParams()
  const navigate = useNavigate()

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  })

  const [archivo, setArchivo] = useState('')


  //Consultar a la Api el producto a editar

  //Extraer valores del State

  
  useEffect(() => {
    consultarApi()
  }, [])
  
  
  const consultarApi = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`)
    console.log(productoConsulta.data)
     setProducto(productoConsulta.data)
  }
  
  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }
  
  const handleImage = (e) => {
    setArchivo(e.target.files[0])
  }
  
  const handleEdit = async (e) => {
    e.preventDefault();
    
    //Crear un formdata para la imagen
    const formData = new FormData();
    formData.append('nombre', producto.nombre)
    formData.append('precio', producto.precio)
    formData.append('imagen', archivo)
    
    //Almacenar en la DB
    const res =  await clienteAxios.put(`/productos/${id}`, formData , {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    Swal.fire(
      'Editado correctamente',
      res.data.mensaje,
      'success'
      )
      navigate('/productos')
      
    }
    
    const { nombre, precio, imagen } = producto
    
  
  
return (
  <>
  <h2>Editar Producto</h2>

  <form onSubmit={handleEdit} >
      <legend>Llena todos los campos</legend>

      <div className="campo">
          <label>Nombre:</label>
          <input 
              type="text" 
              placeholder="Nombre Producto" 
              name="nombre"
              onChange={handleChange}
              value={nombre}
              
          />
      </div>

      <div className="campo">
          <label>Precio:</label>
          <input 
                type="number" 
                name="precio" 
                min="0.00" 
                step="0.01" 
                placeholder="Precio"
                onChange={handleChange} 
                value={precio}
                
          />
      </div>

      <div className="campo">
          <label>Imagen:</label>
          {
            imagen ? (
              <img src={`http://localhost:5000/${imagen}`} alt='imagen' /> 
            ) : null
          }
          <input 
              type="file"  
              name="imagen"
              onChange={handleImage} 
             

          />
      </div>

      <div className="enviar">
              <input type="submit" class="btn btn-azul" value="Editar Producto"/>
      </div>
  </form>
  </>
  )
}

export default EditarProducto