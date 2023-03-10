import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import clienteAxios from "../../config/axios"


const NuevoProducto = () => {
  
  const navigate = useNavigate()


  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
    })

    const [archivo, setArchivo] = useState('')

    const handleChange = (e) => {
      setProducto({
        ...producto,
        [e.target.name] : e.target.value
      })
    }

    const handleImage = (e) => {
      setArchivo(e.target.files[0])
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      //Crear un formdata para la imagen
      const formData = new FormData();
      formData.append('nombre', producto.nombre)
      formData.append('precio', producto.precio)
      formData.append('imagen', archivo)
   

      //Almacenar en la DB
     const res =  await clienteAxios.post('/productos', formData , {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      Swal.fire(
        'Agregado correctamente',
        res.data.mensaje,
        'success'
      )
      navigate('/productos')

    }

  return (
    <>
       <h2>Nuevo Producto</h2>

          <form onSubmit={handleSubmit} >
              <legend>Llena todos los campos</legend>

              <div className="campo">
                  <label>Nombre:</label>
                  <input 
                      type="text" 
                      placeholder="Nombre Producto" 
                      name="nombre"
                      onChange={handleChange}
                      
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
                        
                  />
              </div>

              <div className="campo">
                  <label>Imagen:</label>
                  <input 
                      type="file"  
                      name="imagen"
                      onChange={handleImage} 

                  />
              </div>

              <div className="enviar">
                      <input type="submit" class="btn btn-azul" value="Agregar Producto"/>
              </div>
          </form>
    </>
  )
}

export default NuevoProducto