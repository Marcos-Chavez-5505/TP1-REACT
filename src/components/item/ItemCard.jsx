import { useState, useEffect } from "react";
import itemCardStyles from './itemCard.module.css'
import DeleteModal from "../modalDelete/modalDelete";
import Form from "../form/Form"; // Importamos el Form reutilizable

export default function ItemCard({
  title = 'Titulo',
  type = 'Serie/Pelicula',
  year = 'Año',
  rating = 3, 
  director = 'Director',
  genres = [],
  id,
  getMovies,
  editMovie,
  deleteMovie,
}) {
  const fullStars = Math.floor(rating); // no es necesario usar floor
  const emptyStars = 5 - fullStars;
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  const openEditModal = () => {setIsEditModalVisible(true);};
  const closeEditModal = () => {setIsEditModalVisible(false);};

    const [watched, setWatched] = useState(false);

    useEffect(() => {
        const allMovies = getMovies();
        const currentMovie = allMovies.find(movie => movie.title === title);
            if (currentMovie) {
            setWatched(currentMovie.watched);
        }
    }, [getMovies, title]);

    const markAsWatched = (e, movieTitle) => {
        e.stopPropagation();  //es para que no se active el modal
        const nuevoEstado = !watched
        setWatched(nuevoEstado);
        editMovie(movieTitle, nuevoEstado);
    };

    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

    const showModal = (e) => { 
        e.stopPropagation();  //es para que no se active el modal de la edicion de card
        setVisibleDeleteModal(true);
    }

    const cerrarModal = () => {
        setVisibleDeleteModal(false);
    }

    const erase = (movieTitle) => {
        deleteMovie(movieTitle)
    }

    const handleEdit = (updatedMovie) => {
        editMovie(updatedMovie);
        setIsEditModalVisible(false);
    }

    const initialData = {
        id: id,
        title: title,
        director: director,
        year: year,
        genres: genres,
        rating: rating,
        type: type,
        watched: watched
    }

  return (
    <>
      <article className={itemCardStyles.card} onClick={openEditModal}>
      <button className={itemCardStyles.deleteButton} onClick={(e) => showModal(e)}>
        ×
      </button>
  
        <h2 
          className={itemCardStyles.title} 
          title={title}  
        >
          {title}
        </h2>

        <div className={itemCardStyles.typeGenreContainer}>
          <span className={itemCardStyles.type}>{type}</span>
          <span className={itemCardStyles.genre}>
            {genres && genres.length > 0
                ? genres.join(', ')
                : 'Sin género'}
          </span>
        </div>
  
        <div className={itemCardStyles.yearRatingContainer}>
          <span className={itemCardStyles.year}>{year}</span>
          <span className={itemCardStyles.dot}>·</span>
          <span className={itemCardStyles.rating} aria-label={`Calificación: ${rating} de 5`}>
            {'★'.repeat(fullStars)}
            {'☆'.repeat(emptyStars)}
          </span>
        </div>
  
        
        <p className={itemCardStyles.director}>Dirigido por <span className={itemCardStyles.directorsName}>{director}</span></p>
  
      <button className={itemCardStyles.watchedButton} onClick={(e) => markAsWatched(e, title)}>
        {watched ? "Marcar como NO vista" : "Marcar como vista"}
      </button>


      </article>
      
        <DeleteModal 
          isVisible={visibleDeleteModal}
          onClose={cerrarModal}
          onConfirm={() => erase(title)}
          title={title}
        />

        <Form
          isVisible={isEditModalVisible}
          onClose={closeEditModal}
          onAdd={() => {}}
          onEdit={handleEdit}
          initialData={initialData}
        />
    </>
  )
}