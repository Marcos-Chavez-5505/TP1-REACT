# Gestor de Peliculas y Series

---

## Miembros del Grupo

| Nombre | Email | Rol |
|--------|-------|-----|
| Marcos Chavez | marcos.chavez@est.fi.uncoma.edu.ar | Scrum Master / Coordinador |
| Lucas Martinez | lucas.martinez@est.fi.uncoma.edu.ar | Desarrollador Frontend + UI |
| Lautaro Lara | lautaro.lara@est.fi.uncoma.edu.ar | Desarrollador Logica Principal |

---

## Descripcion de la Aplicacion

Aplicacion web desarrollada con React y Vite que funciona como un gestor personal de peliculas y series.

### Funcionalidades principales

- Agregar nuevas peliculas o series (titulo, director, año, genero, rating, tipo)
- Marcar contenido como "visto"
- Editar y eliminar items (con confirmacion)
- Dos listas separadas: Por ver y Vistas
- Contadores por lista y por genero
- Buscador por titulo o director
- Filtros por genero y tipo
- Ordenamiento por año y rating (ascendente/descendente)
- Persistencia de datos con localStorage
- Diseño oscuro y minimalista

---

## Instalacion y Guia de Uso

### Requisitos previos

- Node.js (version 14 o superior)
- npm (viene con Node.js)

### Pasos para instalar y correr la aplicacion

```bash
# 1. Clonar el repositorio
git clone https://github.com/Marcos-Chavez-5505/TP1-REACT.git

# 2. Entrar a la carpeta del proyecto
cd TP1-REACT

# 3. Instalar dependencias
npm install

# 4. Iniciar la aplicacion con Vite
npm run dev
