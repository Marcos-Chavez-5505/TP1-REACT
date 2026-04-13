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
        let peliculas = JSON.parse(localStorage.getItem('movies'));

        peliculas = peliculas.map(peli => 
            peli.title === movieTitle
                ? { ...peli, watched: watched } 
                : peli
        );

        localStorage.setItem('movies', JSON.stringify(peliculas));
        setMovies(peliculas); 
    }

    const deleteMovie = (movieTitle) => {
        let movies = JSON.parse(localStorage.getItem('movies'));

        let newMovieArray = movies.filter(movie => movie.title !== movieTitle)

        localStorage.setItem('movies', JSON.stringify(newMovieArray));
        setMovies(newMovieArray)
    }

    // Calcular contadores
    const pendingCount = movies.filter(m => !m.watched).length;
    const watchedCount = movies.filter(m => m.watched).length;
    console.log(movies)
  return (
    <div>
        <Title texto="Gestor de Películas y Series" />

        <button className={styles.addButton} onClick={() => setShowModal(true)}>
            Agregar Película o Serie
        </button>


        <div className={styles.twoColumns}>
            <div>
                <h2>Por ver: {pendingCount}</h2>
                <List 
                    getMovies={getMovies} 
                    deleteMovie={deleteMovie} 
                    editMovie={editMovie}
                    filterType="towatch"
                    emptyMessage="No hay películas por ver"
                />
            </div>

            <div>
                <h2>Vistas: {watchedCount}</h2>
                <List 
                    getMovies={getMovies} 
                    deleteMovie={deleteMovie} 
                    editMovie={editMovie}
                    filterType="watched"
                    emptyMessage="No hay películas vistas"
                />
            </div>
        </div>

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