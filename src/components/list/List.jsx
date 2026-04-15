import listStyles from './list.module.css'
import ItemCard from '../item/ItemCard'

export default function List({ items, editItem, deleteItem, filterType, emptyMessage, sortType }) {
  
  const filteredItems = items.filter(item => {
    if (filterType === 'watched') return item.watched === true
    if (filterType === 'towatch') return item.watched === false
    return true;
  });

  const sortedFilteredItems = (sortType) =>{
        let sortedArray = [...filteredItems]
        if (sortType === "year"){
            sortedArray = [...filteredItems].sort((a, b) => parseInt(b.year) - parseInt(a.year))
        }
        
        if(sortType === "rating"){
            sortedArray = [...filteredItems].sort((a, b) => b.rating - a.rating)
        }
        console.log(sortedArray)
        return sortedArray
    }
  // Mensaje 
  const emptyMessageToShow = emptyMessage || `No hay películas en esta sección`

  const itemsToShow = sortedFilteredItems(sortType)
  return (
    <section className={listStyles.listContainer}>
      {itemsToShow.length > 0 ? (
        itemsToShow.map((item) => (
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
        <p className={listStyles.emptyMessage}>{emptyMessageToShow}</p>
      )}
    </section>
  );
}