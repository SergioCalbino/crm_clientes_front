import React from "react";

const BuscarProducto = ({ buscarProducto, leerDatosDeBusqueda }) => {
   
      return (
    
    
    <form onSubmit={buscarProducto}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className="campo">
        <label>Productos:</label>
        <input type="text" 
            placeholder="Nombre Productos" 
            name="productos" 
            onChange={leerDatosDeBusqueda}

            />
      </div>
      <input type='submit'
            className="btn btn-azul btn-block"
            placeholder='Buscar Producto'
       />
    </form>
  );
};

export default BuscarProducto;
