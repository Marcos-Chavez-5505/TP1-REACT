// List.jsx
import listStyles from './list.module.css'
import ItemCard from '../item/ItemCard'

export default function List({ getMovies, editMovie, deleteMovie, filterType, emptyMessage }) {
  const movies = getMovies();
  
  const filteredMovies = movies.filter(movie => {
    if (filterType === 'watched') return movie.watched === true;
    if (filterType === 'towatch') return movie.watched === false;
    return true;
  });

  // Mensaje 
  const mensajeVacio = emptyMessage || `No hay películas en esta sección`;

  return (
    <section className={listStyles.listContainer}>
      {filteredMovies.length > 0 ? (
        filteredMovies.map((item) => (
          <ItemCard
            key={item?.title}
            title={item?.title}
            type={item?.type}
            genres={item?.genres}
            year={item?.year}
            rating={item?.rating}
            director={item?.director}
            watched={item?.watched}
            getMovies={getMovies}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
          />
        ))
      ) : (
        <p className={listStyles.emptyMessage}>{mensajeVacio}</p>
      )}
    </section>
  );
}