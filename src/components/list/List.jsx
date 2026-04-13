// List.jsx
import listStyles from './list.module.css'
import ItemCard from '../item/ItemCard'

export default function List({ getMovies, editMovie, deleteMovie, filterType, emptyMessage, sortType }) {
  const movies = getMovies();
  
  const filteredMovies = movies.filter(movie => {
    if (filterType === 'watched') return movie.watched === true;
    if (filterType === 'towatch') return movie.watched === false;
    return true;
  });

  const sortedFilteredMovies = (sortType) =>{
        let sortedArray = [...filteredMovies]
        if (sortType === "year"){
            sortedArray = [...filteredMovies].sort((a, b) => parseInt(b.year) - parseInt(a.year))
        }
        
        if(sortType === "rating"){
            sortedArray = [...filteredMovies].sort((a, b) => b.rating - a.rating)
        }
        console.log(sortedArray)
        return sortedArray
    }
  // Mensaje 
  const mensajeVacio = emptyMessage || `No hay películas en esta sección`;

  const moviesToShow = sortedFilteredMovies(sortType)
  return (
    <section className={listStyles.listContainer}>
      {moviesToShow.length > 0 ? (
        moviesToShow.map((item) => (
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