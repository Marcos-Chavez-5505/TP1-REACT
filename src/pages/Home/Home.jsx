import { useState, useEffect } from "react";

// Componentes
import Title from "../../components/title/Title";
import Form from "../../components/form/Form";

const Home = () => {

    // Estados
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    // Obtener datos del localStorage
    const getMovies = () => {
        const data = localStorage.getItem("movies");
        return data ? JSON.parse(data) : [];
    };

    const [movies, setMovies] = useState(getMovies);
    
    // Función para agregar película
    const addMovie = (newMovie) => {
        const updatedMovies = [...movies, newMovie];
        setMovies(updatedMovies);
        localStorage.setItem("movies", JSON.stringify(updatedMovies));
    };

    // Función para cerrar modal
    const closeModal = () => {
        setShowModal(false);
    };


    // PARA LAUTI QUE VA A CREAR LAS FUNCIONES
    // Forma convencional de crear funciones en react
    // Siempre se declara con const, si no hay parametro se deja vacio
    const functionName = (parameter) => {
        // codigo
    }

    console.log(movies)
  return (
    <div>
        <Title texto="Gestor de Películas y Series" />

        <button onClick={() => setShowModal(true)}>
            Agregar Película o Serie
        </button>

        {/* Contadores */}
        <div>
            <p>Por ver: 0</p>
            <p>Vistas: 0</p>
        </div>

        {/* Listas */}
        <h2>Por ver</h2>
        {/* <List type="toWatch" /> */}
        <p>No hay películas por ver</p>

        <h2>Vistas</h2>
        {/* <List type="watched" /> */}
        <p>No hay películas vistas</p>

        {/* Modal del formulario */}
        <Form 
            onAdd={addMovie}
            onClose={closeModal}
            isVisible={showModal}
        />
    </div>
  );
}

export default Home;