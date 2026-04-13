import { useState } from "react";
import styles from "./Home.module.css";
// Componentes
import Title from "../../components/title/Title";
import Form from "../../components/form/Form";
import List from "../../components/list/List";



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

    // !Esta funcion se llama en itemCard.jsx
    const editMovie = (movieTitle, watched) => { 
        // Lo tengo que utilizar para actualizar vista o no vista
        let peliculas = JSON.parse(localStorage.getItem('movies'));

        peliculas = peliculas.map(peli => 
        peli.title === movieTitle
            ? { ...peli, watched: watched } 
            : peli
        );

        localStorage.setItem('movies', JSON.stringify(peliculas));
    }

    const deleteMovie = (movieTitle) => {
        let movies = JSON.parse(localStorage.getItem('movies'));

        let newMovieArray = movies.filter(movie => movie.title !== movieTitle)

        localStorage.setItem('movies', JSON.stringify(newMovieArray));
        setMovies(newMovieArray)
    }

    console.log(movies)
  return (
    <div>
        <Title texto="Gestor de Películas y Series" />

        <button className={styles.addButton} onClick={() => setShowModal(true)}>
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

        <List getMovies={getMovies} deleteMovie={deleteMovie} editMovie={editMovie}/>
    </div>


  );
}

export default Home;