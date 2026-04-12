// components/DeleteModal.jsx
import styles from './modalDelete.module.css';

export default function DeleteModal({ isVisible, onClose, onConfirm, title }) {
  if (!isVisible) return null;
  
  return (
    <div className={styles.modalDelete}>
      <div className={styles.modalDeleteContent}>
        <p>¿Seguro que quiere borrar "{title}"?</p>
        <div className={styles.modalDeleteButtons}>
          <button 
            className={styles.modalCancelButton}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className={styles.modalDeleteButton}
            onClick={onConfirm}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}