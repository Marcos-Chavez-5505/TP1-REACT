import { useState, useEffect } from "react";

// Componentes
import Title from "../../components/title/Title";
import Form from "../../components/form/Form";
import List from "../../components/list/List";


const arrayMovies = [
  {
    title: "El Padrino",
    type: "Película",
    genre: "Drama, Crimen",
    year: 1972,
    rating: 5,
    director: "Francis Ford Coppola"
  },
  {
    title: "Origen",
    type: "Película",
    genre: "Ciencia ficción, Acción",
    year: 2010,
    rating: 4,
    director: "Christopher Nolan"
  },
  {
    title: "Pulp Fiction",
    type: "Película",
    genre: "Crimen, Drama",
    year: 1994,
    rating: 5,
    director: "Quentin Tarantino"
  },
  {
    title: "The Matrix",
    type: "Película",
    genre: "Acción, Ciencia ficción",
    year: 1999,
    rating: 4,
    director: "Lana Wachowski, Lilly Wachowski"
  },
  {
    title: "Forrest Gump",
    type: "Película",
    genre: "Drama, Romance",
    year: 1994,
    rating: 4,
    director: "Robert Zemeckis"
  },
  {
    title: "Interestelar",
    type: "Película",
    genre: "Ciencia ficción, Drama",
    year: 2014,
    rating: 4,
    director: "Christopher Nolan"
  },
  {
    title: "Parásitos",
    type: "Película",
    genre: "Thriller, Drama",
    year: 2019,
    rating: 5,
    director: "Bong Joon-ho"
  }
];


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

        <List itemsToList={arrayMovies} getMovies={getMovies} editMovie={editMovie}/>
    </div>


  );
}

export default Home;