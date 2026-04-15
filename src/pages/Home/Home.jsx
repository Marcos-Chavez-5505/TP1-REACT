import { useState } from "react";
import styles from "./Home.module.css";
// Componentes
import Title from "../../components/title/Title";
import Form from "../../components/form/Form";
import List from "../../components/list/List";
import InputSearch from "../../components/inputSearch/InputSearch"
import CheckboxFilter from "../../components/checkboxFilter/CheckboxFilter"


const Home = () => {

    // Estados
    const [showModal, setShowModal] = useState(false)
    const [sortType, setSortType] = useState("year")
    const [sortBy, setSortBy] = useState('year')
    const [sortDirection, setSortDirection] = useState('desc')


    // Obtener datos del localStorage
    const getItems = () => {
        const data = localStorage.getItem("movies");
        return data ? JSON.parse(data) : []
    };

    const [items, setItems] = useState(getItems)
    
    // Función para agregar película
    const addItem = (newItems) => {
        const updatedItems = [...items, newItems]
        setItems(updatedItems);
        localStorage.setItem("movies", JSON.stringify(updatedItems))
    };

    // Función para cerrar modal
    const closeModal = () => {
        setShowModal(false)
    }

    // Function to sort items
    const sortItems = (items) => {
        if (!items.length) return items
        
        return [...items].sort((a, b) => {
            let aValue = a[sortBy]
            let bValue = b[sortBy]
            
            if (sortBy === 'rating') {
                aValue = Number(aValue)
                bValue = Number(bValue)
            }
            
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })
    }

    // !Esta funcion se llama en itemCard.jsx
    const editItem = (itemTitle, updatedItem) => { 
        let itemsEdit = JSON.parse(localStorage.getItem('movies'))

        itemsEdit = itemsEdit.map(itemE => 
            itemE.title === itemTitle
                ? updatedItem 
                : itemE
        );

        localStorage.setItem('movies', JSON.stringify(itemsEdit))
        setItems(itemsEdit)
    }

    const deleteItem = (itemTitle) => {
        let items = JSON.parse(localStorage.getItem('movies'))

        let newItemArray = items.filter(item => item.title !== itemTitle)

        localStorage.setItem('movies', JSON.stringify(newItemArray));
        setItems(newItemArray)
    }

    // Calcular contadores
    const pendingCount = items.filter(m => !m.watched).length
    const watchedCount = items.filter(m => m.watched).length


   // Calcular contadores por género
    const getGenreCounts = () => {
        const counts = {}
        
        items.forEach(item => {
            if (item.genres && Array.isArray(item.genres)) {
                item.genres.forEach(genre => {
                    counts[genre] = (counts[genre] || 0) + 1
                });
            }
        });
        
        return counts
    }

    const genreCounts = getGenreCounts()





	const [inputValue, setInputValue] = useState("");
	const [checkboxFilter, setCheckboxFilter] = useState(['Película', 'Serie']);

    const setCheckboxFilterArray = (a) => {
        if (!checkboxFilter) { setCheckboxFilter([]); }
        if (checkboxFilter?.includes(a)) {
            setCheckboxFilter(checkboxFilter?.filter((item)=>(item!==a)));
        } else {
            setCheckboxFilter([...checkboxFilter, a])
        }
    }

    const filteredItems = items.filter((item) => {
        return item.title.toLowerCase().includes(inputValue.toLowerCase())
            && checkboxFilter.includes(item.type);
    })

    return (
        <div>
            <Title texto="Películas y series por ver" />

            <button className={styles.addButton} onClick={() => setShowModal(true)}>
                Agregar Película o Serie
            </button>

            <InputSearch
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                placeholder="Buscar películas o series"
            />
            <CheckboxFilter
                values={['Película', 'Serie']}
                selected={checkboxFilter}
                onChange={(e)=>{
                    setCheckboxFilterArray(e.target.value);
                }}
            />
            
            <br/>
            <div className={styles.sortContainer}>
                <p className={styles.sortLabel}>Ordenar por:</p>
                <div className={styles.sortControls}>
                    <select 
                        className={styles.sortSelect}
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="year">Año</option>
                        <option value="rating">Rating</option>
                    </select>
                    
                    <button 
                        className={styles.sortButton}
                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortDirection === 'asc' ? 'Ascendente ↑' : 'Descendente ↓'}
                    </button>
                </div>
            </div>

            <div className={styles.genreCounters}>
                <h3>Contadores por género:</h3>
                {Object.entries(genreCounts).length === 0 ? (
                    <p>No hay géneros registrados</p>
                ) : (
                    Object.entries(genreCounts).map(([genre, count]) => (
                        <p key={genre}>{genre}: {count}</p>
                    ))
                )}
            </div>

            <div className={styles.twoColumns}>
                <div>
                    <h2>Por ver: {pendingCount}</h2>
                    <List 
                        items={sortItems(filteredItems.filter(item => !item.watched))} 
                        deleteItem={deleteItem} 
                        editItem={editItem}
                        filterType="towatch"
                        emptyMessage="No hay películas por ver"
                    />
                </div>

                <div>
                    <h2>Vistas: {watchedCount}</h2>
                    <List 
                        items={sortItems(filteredItems.filter(item => item.watched))} 
                        deleteItem={deleteItem} 
                        editItem={editItem}
                        filterType="watched"
                        emptyMessage="No hay películas vistas"
                    />
                </div>
            </div>

            {/* Modal del formulario */}
            <Form 
                onAdd={addItem}
                onClose={closeModal}
                isVisible={showModal}
            />

        </div>
    );
}

export default Home;