import { useState, useEffect } from "react";



// Componentes
import Titulo from "../../components/titulo/Titulo";
import Formulario from "../../components/formulario/Formulario";

const Home = () => {

    // UseStates
    const [modalFormulario, setModalFormulario] = useState(false)

    const [modalEditar, setModalEditar] = useState(false)


    // Obtener datos del local storage
    const obtenerPeliculas = () => {
        const data = localStorage.getItem("peliculas");
        return data ? JSON.parse(data) : [];
    };

    const [peliculas, setPeliculas] = useState(obtenerPeliculas);

    
    // Función para agregar película
    const agregarPelicula = (nuevaPelicula) => {
        const peliculasActualizadas = [...peliculas, nuevaPelicula];
        setPeliculas(peliculasActualizadas);
        localStorage.setItem("peliculas", JSON.stringify(peliculasActualizadas));
    };

    // Función para cerrar modal
    const cerrarModal = () => {
        setModalFormulario(false);
    };


    // PARA LAUTI QUE VA A CREAR LAS FUNCIONES
    // Forma convencional de crear funciones en react
    // Siempre se declara con const, si no hay parametro se deja vacio
    const nombreFuncion = (parametro) =>{
        //codigo
    }

  return (
    <div>
        <Titulo texto="Gestor de Películas y Series" />

        <button onClick={() => setModalFormulario(true)}>
            Agregar Película o Serie
        </button>

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


        {/* Modal del formulario */}
        <Formulario 
            agregar={agregarPelicula}
            cerrar={cerrarModal}
            mostrar={modalFormulario}
        />
    </div>
  );
}

export default Home;