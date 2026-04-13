import listStyles from './list.module.css'
import ItemCard from '../item/ItemCard'

export default function List({itemsToList, getMovies, editMovie, deleteMovie}) {
const movies = getMovies();
  return (
    <section className={listStyles.listContainer}>
      {movies.map((item)=>{
        return (
        <ItemCard
          key={item?.title}
          title={item?.title}
          type={item?.type}
          genres={item?.genres}
          year={item?.year}
          rating={item?.rating}
          director={item?.director}
          getMovies={getMovies}
          editMovie={editMovie}
          deleteMovie={deleteMovie}
        />
        )
      })}
    </section>
  )
}