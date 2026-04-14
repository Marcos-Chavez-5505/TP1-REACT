import { useState, useEffect } from 'react'
import styles from './form.module.css'

function Form({ onAdd, onEdit, onClose, isVisible, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genres: [],
    rating: 0,
    type: 'Película',
    watched: false
  })

  const [errors, setErrors] = useState({})  

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        director: initialData.director || '',
        year: initialData.year || '',
       genres: Array.isArray(initialData.genres)
        ? initialData.genres
        : [],
        rating: initialData.rating || 0,
        type: initialData.type || 'Película',
        watched: initialData.watched || false
      })
    } else {
      setFormData({
        title: '',
        director: '',
        year: '',
        genres: [],
        rating: 0,
        type: 'Película',
        watched: false
      })
    }
    setErrors({})
  }, [initialData, isVisible])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleGenreChange = (genre) => {
    setFormData(prev => {
      const already = prev.genres.includes(genre)
      return {
        ...prev,
        genres: already
          ? prev.genres.filter(g => g !== genre)
          : [...prev.genres, genre]
      }
    })
    if (errors.genres) setErrors(prev => ({ ...prev, genres: null }))
  }

  const validate = () => {
    const currentYear = new Date().getFullYear()
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = 'El título es requerido'
    if (!formData.director.trim()) newErrors.director = 'El director es requerido'
    if (!formData.year) {
      newErrors.year = 'El año es requerido'
    } else if (formData.year < 1900 || formData.year > currentYear) {
      newErrors.year = `Debe estar entre 1900 y ${currentYear}`
    }
    
    if (formData.genres.length === 0) {
      newErrors.genres = 'Debes seleccionar al menos un género'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
        ...formData,
        genres: Array.isArray(formData.genres) ? formData.genres : [],
        id: initialData ? initialData.id : Date.now()    // revisar, creo que tiene que ser el título
        }

        if (initialData) {
        onEdit(payload)
        } else {
        onAdd(payload)
    }

    // Resetear solo si es modo creación
    if (!initialData) {
      setFormData({
        title: '',
        director: '',
        year: '',
        genres: [],
        rating: 0,
        type: 'Película',
        watched: false
      })
    }
    setErrors({})
    onClose()
  }

  if (!isVisible) return null

  return (
    <section className={styles.panelContainer}>
      <div className={styles.panelBackground} onClick={onClose}></div>

      <article className={styles.panel}>
        <button className={styles.closePanelCross} onClick={onClose}>×</button>

        <h2 className={styles.titlePanel}>
          {initialData ? 'Editar tarjeta' : 'Agregar película o serie'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              name="title"
              placeholder="Título de serie o película"
              value={formData.title}
              onChange={handleChange}
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            />
            {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.fieldType}>
              <label className={styles.label}>Tipo</label>
              <div className={styles.radioGroup}>
                {['Película', 'Serie'].map(t => (
                  <label key={t} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={formData.type === t}
                      onChange={handleChange}
                      className={styles.radio}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.fieldYear}>
              <label className={styles.label}>Año</label>
              <input
                type="number"
                name="year"
                placeholder="0000"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className={`${styles.input} ${errors.year ? styles.inputError : ''}`}
              />
              {errors.year && <span className={styles.errorMsg}>{errors.year}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Género</label>
            <div className={`${styles.genreGrid} ${errors.genres ? styles.gridError : ''}`}>
              {['Acción', 'Drama', 'Aventura', 'Fantasía', 'Comedia', 'Ciencia Ficción', 'Terror', 'Otro'].map(g => (
                <label key={g} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(g)}
                    onChange={() => handleGenreChange(g)}
                    className={styles.checkbox}
                  />
                  {g}
                </label>
              ))}
            </div>
            {errors.genres && <span className={styles.errorMsg}>{errors.genres}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Director</label>
            <input
              type="text"
              name="director"
              placeholder="Nombre del director"
              value={formData.director}
              onChange={handleChange}
              className={`${styles.input} ${errors.director ? styles.inputError : ''}`}
            />
            {errors.director && <span className={styles.errorMsg}>{errors.director}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Rating</label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(n => (
                <span
                  key={n}
                  onClick={() => setFormData(prev => ({ ...prev, rating: n }))}
                  className={n <= formData.rating
                    ? `${styles.star} ${styles.starFilled}`
                    : styles.star}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.modalButtons}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </article>
    </section>
  )
}

export default Form