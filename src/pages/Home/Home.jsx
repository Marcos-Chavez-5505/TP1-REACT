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
    const [showEditModal, setShowEditModal] = useState(false)
    const [sortType, setSortType] = useState("")

    // Obtener datos del localStorage
    const getItems = () => {
        const data = localStorage.getItem("movies");
        return data ? JSON.parse(data) : [];
    };

    const [items, setItems] = useState(getItems);
    
    // Función para agregar película
    const addItem = (newItems) => {
        const updatedItems = [...items, newItems];
        setItems(updatedItems);
        localStorage.setItem("movies", JSON.stringify(updatedItems));
    };

    // Función para cerrar modal
    const closeModal = () => {
        setShowModal(false);
    };

    // !Esta funcion se llama en itemCard.jsx
    const editItem = (itemTitle, updatedItem) => { 
        let itemsEdit = JSON.parse(localStorage.getItem('movies'));

        itemsEdit = itemsEdit.map(itemE => 
            itemE.title === itemTitle
                ? updatedItem 
                : itemE
        );

        localStorage.setItem('movies', JSON.stringify(itemsEdit));
        setItems(itemsEdit); 
    }

    const deleteItem = (itemTitle) => {
        let items = JSON.parse(localStorage.getItem('movies'));

        let newItemArray = items.filter(item => item.title !== itemTitle)

        localStorage.setItem('movies', JSON.stringify(newItemArray));
        setItems(newItemArray)
    }

    // Calcular contadores
    const pendingCount = items.filter(m => !m.watched).length;
    const watchedCount = items.filter(m => m.watched).length;


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

    const filteredItems = items
        .filter((item) => {
            return item.title.toLowerCase().includes(inputValue.toLowerCase())
            && checkboxFilter.includes(item.type);
        })
        .sort((a, b) => {
            if (sortType === "year") return b.year - a.year;
            if (sortType === "rating") return b.rating - a.rating;
            return 0;
        });

    return (
        <div>
            <Title texto="Gestor de Películas y Series" />

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
            <select name="sortType" className={styles.sortSelect} onChange={(e) => setSortType(e.target.value)} value={sortType}>
                <option value="" disabled>Ordenar por</option>
                <option value="year">Año</option>
                <option value="rating">Rating</option>
            </select>

            <div className={styles.twoColumns}>
                <div>
                    <h2>Por ver: {pendingCount}</h2>
                    <List 
                        items={filteredItems} 
                        deleteItem={deleteItem} 
                        editItem={editItem}
                        filterType="towatch"
                        emptyMessage="No hay películas por ver"
                        sortType={sortType}
                    />
                </div>

                <div>
                    <h2>Vistas: {watchedCount}</h2>
                    <List 
                        items={filteredItems} 
                        deleteItem={deleteItem} 
                        editItem={editItem}
                        filterType="watched"
                        emptyMessage="No hay películas vistas"
                        sortType={sortType}
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