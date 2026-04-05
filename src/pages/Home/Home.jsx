import { useState, useEffect } from "react";



// Componentes
import Titulo from "../../components/titulo/Titulo";


const Home = () => {
    
    
    // Obtener datos del local storage
    const obtenerPeliculas = () => {
        const data = localStorage.getItem("peliculas");
        return data ? JSON.parse(data) : [];
    };

    const [peliculas, setPeliculas] = useState(obtenerPeliculas);



    // PARA LAUTI QUE VA A CREAR LAS FUNCIONES
    // Forma convencional de crear funciones en react
    // Siempre se declara con const, si no hay parametro se deja vacio
    const nombreFuncion = (parametro) =>{
        //codigo
    }

  return (
    <div>
      <Titulo texto="Gestor de Películas y Series" />

      {/* Formulario */}
      {/* <Formulario /> */}

      {/* Filtros */}
      {/* <Filtros /> */}

      {/* Contadores */}
      <div>
        <p>Por ver: 0</p>
        <p>Vistas: 0</p>
      </div>

      {/* Listas */}
      <h2>Por ver</h2>
      {/* <Lista tipo="porVer" /> */}
      <p>No hay películas por ver</p>

      <h2>Vistas</h2>
      {/* <Lista tipo="vistas" /> */}
      <p>No hay películas vistas</p>
    </div>
  );
}

export default Home;