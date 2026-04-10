import { useState } from 'react'
import "../formulario/formulario.css" 

function Formulario({ agregar, cerrar, mostrar }) {
  const [datosFormulario, setDatosFormulario] = useState({
    titulo: '',
    director: '',
    año: '',
    genero: 'accion',
    rating: 5,
    tipo: 'pelicula',
    visto: false
  })


  // Cada vez que un input se modifica los datos de van guardando dentro del useState
  const controlarCambios = (e) => {
    const { name, value } = e.target
    setDatosFormulario(prev => ({ ...prev, [name]: value }))
  }

  // Guarda los datos de las peliculas
  const controlarSubmit = (e) => {
    e.preventDefault()
    
    // validaciones
    if (!datosFormulario.titulo.trim() || !datosFormulario.director.trim() || !datosFormulario.año) {
      alert('Completá todos los campos')
      return
    }
    
    agregar({
      ...datosFormulario,
      id: Date.now()
    })
    
    setDatosFormulario({
      titulo: '',
      director: '',
      año: '',
      genero: 'accion',
      rating: 5,
      tipo: 'pelicula',
      visto: false
    })
    
    cerrar()
  }

  if (!mostrar) return null

  return (
    <div className="fondo-modal" onClick={cerrar}>
      <div className="contenido-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={cerrar}>✕</button>
        
        <h2>Agregar Película o Serie</h2>
        
        <form onSubmit={controlarSubmit}>
          <input
            type="text"
            name="titulo"
            value={datosFormulario.titulo}
            onChange={controlarCambios}
            placeholder="Título"
            required
          />
          
          <input
            type="text"
            name="director"
            value={datosFormulario.director}
            onChange={controlarCambios}
            placeholder="Director"
            required
          />
          
          <input
            type="number"
            name="año"
            value={datosFormulario.año}
            onChange={controlarCambios}
            placeholder="Año"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
          
          <select name="genero" value={datosFormulario.genero} onChange={controlarCambios}>
            <option value="accion">Acción</option>
            <option value="comedia">Comedia</option>
            <option value="drama">Drama</option>
            <option value="terror">Terror</option>
            <option value="ciencia-ficcion">Ciencia Ficción</option>
          </select>
          
          {/* Se que los emojis parecen ia pero queda bien */}
          <select name="rating" value={datosFormulario.rating} onChange={controlarCambios}>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
          
          <select name="tipo" value={datosFormulario.tipo} onChange={controlarCambios}>
            <option value="pelicula">Película</option>
            <option value="serie">Serie</option>
          </select>
          
          <div className="botones-modal">
            <button type="button" onClick={cerrar}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Formulario