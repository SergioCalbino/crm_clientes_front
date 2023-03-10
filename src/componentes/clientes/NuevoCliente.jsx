import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios"
import { CRMContext } from '../../context/CRMContext'

const NuevoCliente = () => {



    const [auth, setAuth ] = useContext(CRMContext)
    const navigate = useNavigate()

    //Verificar si el usuario esta autenticado o no
    if (!auth.auth ) {
        navigate('/')
}    
    //

const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
})

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

const handleSubmit = (e) => {
    e.preventDefault()

    //Enviar peticion a Axios
    clienteAxios.post('/clientes', cliente)
                .then(res => {
                   if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'hubo un error',
                        text: 'Ese cliente ya esta registrado'
                    })
                    
                   } else {
                        Swal.fire(
                            'Se agrego el cliente',
                            res.data.mensaje,
                            'success'
                        )
                        navigate('/')
                   }
                })

}
    

  return (
        <>
            <form onSubmit={handleSubmit} >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={handleChange}

                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={handleChange}
                        
                        />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        onChange={handleChange}

                        />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={handleChange}

                        />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        onChange={handleChange}

                        />
                </div>

                <div className="enviar">
                        <input type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Cliente"
                                disabled={ onValidate() }
                        />
                </div>

            </form>
        </>
  )
}

export default NuevoCliente