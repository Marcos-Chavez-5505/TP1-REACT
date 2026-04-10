import { useState } from 'react'
import "./form.css" 

function Form({ onAdd, onClose, isVisible }) {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: 'action',
    rating: 5,
    type: 'movie',
    watched: false
  })

  // Cada vez que un input se modifica los datos se van guardando dentro del useState
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Guarda los datos de las peliculas
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // validaciones
    if (!formData.title.trim() || !formData.director.trim() || !formData.year) {
      alert('Completá todos los campos')
      return
    }
    
    onAdd({
      ...formData,
      id: Date.now()
    })
    
    setFormData({
      title: '',
      director: '',
      year: '',
      genre: 'action',
      rating: 5,
      type: 'movie',
      watched: false
    })
    
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>Agregar Película o Serie</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            placeholder="Director"
            required
          />
          
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Año"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="action">Acción</option>
            <option value="comedy">Comedia</option>
            <option value="drama">Drama</option>
            <option value="horror">Terror</option>
            <option value="sci-fi">Ciencia Ficción</option>
          </select>
          
          {/* Se que los emojis parecen ia pero queda bien */}
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
          
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="movie">Película</option>
            <option value="series">Serie</option>
          </select>
          
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form