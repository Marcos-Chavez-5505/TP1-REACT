import { useState } from "react";
import itemCardStyles from './itemCard.module.css'

export default function ItemCard({
  title = 'Titulo',
  type = 'Serie/Pelicula',
  genre = 'Genero',
  year = 'Año',
  rating = 3, 
  director = 'Director',
  getMovies,
  editMovie
}) {
  const fullStars = Math.floor(rating); // no es necesario usar floor
  const emptyStars = 5 - fullStars;
  const [openedPanel, setOpenedPanel] = useState(false);
  const openPanel = () => {setOpenedPanel(!openedPanel)};

  const [watched, setWatched] = useState(() => {
    const allMovies = getMovies();
    const currentMovie = allMovies.find(movie => movie.title === title);
    return currentMovie ? currentMovie.watched : false;
  });

  const markAsWatched = (e, movieTitle) => {
    e.stopPropagation();  //es para que no se active el modal
    const nuevoEstado = !watched
    setWatched(nuevoEstado);
    editMovie(movieTitle, nuevoEstado);
  };

  return (
    <>
      <article className={itemCardStyles.card} onClick={openPanel}>
  
        <h2 className={itemCardStyles.title}>{title}</h2>
  
        <div className={itemCardStyles.typeGenreContainer}>
          <span className={itemCardStyles.type}>{type}</span>
          <span className={itemCardStyles.genre}>{genre}</span>
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


      {openedPanel && (
        <section className={itemCardStyles.panelContainer}>
          <div className={itemCardStyles.panelBackground} onClick={openPanel}></div>
          
          <article className={itemCardStyles.panel}>
            <button className={itemCardStyles.closePanelCross} onClick={openPanel}>×</button>

            <h2 className={itemCardStyles.titlePanel}>Editar tarjeta</h2>

            <div className={itemCardStyles.field}>
              <label className={itemCardStyles.label}>Título</label>
              <input
                type="text"
                placeholder="Título de serie o película"
                value={title}
                // onChange={}
                className={itemCardStyles.input}
              />
            </div>

            <div className={itemCardStyles.row}>
              <div className={itemCardStyles.fieldType}>
                <label className={itemCardStyles.label}>Tipo</label>

                <div className={itemCardStyles.radioGroup}>
                  {['Película', 'Serie'].map(t => (
                    <label key={t} className={itemCardStyles.radioLabel}>
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        // checked={type === t}
                        // onChange={}
                        className={itemCardStyles.radio}
                      />
                      {t}
                    </label>
                  ))}
                </div>

              </div>
              <div className={itemCardStyles.fieldYear}>
                <label className={itemCardStyles.label}>Año</label>
                <input
                  type="number"
                  placeholder="0000"
                  value={year}
                  // onChange={}
                  className={itemCardStyles.input}
                />
              </div>
            </div>

            <div className={itemCardStyles.field}>
              <label className={itemCardStyles.label}>Género</label>
              <div className={itemCardStyles.genreGrid}>
                {['Acción', 'Drama', 'Aventura', 'Fantasía', 'Comedia', 'Ciencia Ficción', 'Terror', 'Otro'].map(g => (
                  <label key={g} className={itemCardStyles.checkboxLabel}>
                    <input
                      type="checkbox"
                      // checked={}
                      // onChange={}
                      className={itemCardStyles.checkbox}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div className={itemCardStyles.field}>
              <label className={itemCardStyles.label}>Director</label>
              <input
                type="text"
                placeholder="Nombre del director"
                value={director}
                // onChange={}
                className={itemCardStyles.input}
              />
            </div>

            <div className={itemCardStyles.field}>
              <label className={itemCardStyles.label}>Rating</label>
              <div className={itemCardStyles.stars}>
                {[1, 2, 3, 4, 5].map(n => (
                  <span
                    key={n}
                    onClick={() => setRating(n)}
                    className={n <= rating ? `${itemCardStyles.star} ${itemCardStyles.starFilled}` : itemCardStyles.star}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>
      )}    
    </>
  )
}