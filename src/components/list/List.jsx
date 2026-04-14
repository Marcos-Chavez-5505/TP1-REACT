// List.jsx
import listStyles from './list.module.css'
import ItemCard from '../item/ItemCard'

export default function List({ items, editItem, deleteItem, filterType, emptyMessage }) {
  // const movies = getMovies();
  
  const filteredItems = items.filter(item => {
    if (filterType === 'watched') return item.watched === true;
    if (filterType === 'towatch') return item.watched === false;
    return true;
  });

  // Mensaje 
  const mensajeVacio = emptyMessage || `No hay películas en esta sección`;

  return (
    <section className={listStyles.listContainer}>
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <ItemCard
            key={item?.title}
            title={item?.title}
            type={item?.type}
            genres={item?.genres}
            year={item?.year}
            rating={item?.rating}
            director={item?.director}
            watched={item?.watched}
            items={items}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))
      ) : (
        <p className={listStyles.emptyMessage}>{mensajeVacio}</p>
      )}
    </section>
  );
}