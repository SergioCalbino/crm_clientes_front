import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";

import Clientes from "./componentes/clientes/Clientes";
import EditarCliente from "./componentes/clientes/EditarCliente";
import NuevoCliente from "./componentes/clientes/NuevoCliente";

import EditarProducto from "./componentes/productos/EditarProducto";
import NuevoProducto from "./componentes/productos/NuevoProducto";
import Productos from "./componentes/productos/Productos";

import Pedidos from "./componentes/pedidos/Pedidos";
import NuevoPedido from "./componentes/pedidos/NuevoPedido";
import Login from "./componentes/auth/Login";

import { CRMContext, CRMProvider } from "./context/CRMContext";

function App() {

  //Utilizar Context en el componente
  const [auth, setAuth] = useContext(CRMContext)

  return (
    <>
    
    <BrowserRouter>
      <>
      <CRMProvider value={[auth, setAuth]} >    
      <Header />
      <div className="grid contenedor contenido-principal">   
      <Navegacion />
        <main className="caja-contenido col-9" >
        <Routes>
            
            <Route path="/" element={<Clientes />} />
            <Route path="/clientes/nuevo" element={<NuevoCliente />} />
            <Route path="/clientes/editar/:id" element={<EditarCliente />} />
            
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/productos/editar/:id" element={<EditarProducto />} />
            
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedidos/nuevo/:id" element={<NuevoPedido />} />

            <Route path="/iniciar-sesion" element={ <Login/> }  />
          
        </Routes>
            </main>
      </div>
      </CRMProvider>  
      </>

    </BrowserRouter>
    </>
  );
}

export default App;
