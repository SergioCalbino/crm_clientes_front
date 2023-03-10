import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios"


const EditarCliente = () => {

    //Obtener el id por Params
    let { id } = useParams();
   

    const navigate = useNavigate()
    //

const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
});

    //Query a la api para trae el linet por ID

    const consultarApi = async () => {

        const { data } = await clienteAxios.get(`/clientes/${id}`)
                        setCliente(data)

    }

    //UseEffect, cuando el componente carga

    useEffect(() => {
        consultarApi()
    }, [])
    

const handleChange = (e) => {
    setCliente({
        ...cliente,
        [e.target.name] : e.target.value
    })
}

const onValidate = () => {
    //destructorin al state
    const { nombre, apellido, empresa, telefono, email } = cliente

    
    let valido = !nombre.length || !apellido.length || !empresa.length || !telefono.length || !email.length

    //return true o false
    return valido
}

    const actualizarDatos = async () => {
        await clienteAxios.put(`/clientes/${id}`, cliente)
        .then(res => {
            if (res.data.code === 11000) {
             Swal.fire({
                 icon: 'error',
                 title: 'hubo un error',
                 text: 'Ese cliente ya esta registrado'
             })
             
            } else {
                 Swal.fire(
                    'Correcto', 
                    'Se actualizo correctamente',
                     
                     'success'
                 )
                 navigate('/')
            }
         })

    }

const handleSubmit = (e) => {
    e.preventDefault()
    actualizarDatos()
    //Enviar peticion a Axios
    

}

  return (
        <>
            <h2> Actualizar Cliente </h2>
            <form onSubmit={handleSubmit} >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={handleChange}
                            value={cliente.nombre}

                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={handleChange}
                        value={cliente.apellido}
                        
                        />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        onChange={handleChange}
                        value={cliente.empresa}

                        />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={handleChange}
                        value={cliente.email}

                        />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        onChange={handleChange}
                        value={cliente.telefono}

                        />
                </div>

                <div className="enviar">
                        <input type="submit" 
                                className="btn btn-azul" 
                                value="Guardar Cambios"
                                disabled={ onValidate() }
                        />
                </div>

            </form>
        </>
  )
}

export default EditarCliente