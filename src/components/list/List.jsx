import listStyles from './list.module.css'
import ItemCard from '../item/ItemCard'

export default function List({itemsToList}) {

  return (
    <section className={listStyles.listContainer}>
      {itemsToList.map((item)=>{
        return (
        <ItemCard
          key={item?.title}
          title={item?.title}
          type={item?.type}
          genre={item?.genre}
          year={item?.year}
          rating={item?.rating}
          director={item?.director}
        />
        )
      })}
    </section>
  )
}