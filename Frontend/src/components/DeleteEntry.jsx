import  { useState } from 'react';
import deleteEntryService from "../services/deleteEntryService";





const DeleteEntry = ({id}) => {
 
  const DeletePopup = ({ show, onDelete, onCancel }) => {
    if (!show) return null;
  
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>¿Estás segurx de que quieres borrar esta publicación?</h3>
          <button onClick={onDelete}>Sí, borrar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    );
  };
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
   
    try{
       await deleteEntryService({id});
       console.log("Publicacion borrada con exito!");
    }catch(error){
      setError(error.message)
    }
  };
  
  const handleCancel = () => {
    setShowPopup(false); 
  };

  return (
    <div>
    
      <button onClick={() => setShowPopup(true)}>Borrar Publicación</button>
      <DeletePopup show={showPopup} onDelete={handleDelete} onCancel={handleCancel} />
    </div>
  );
};

export default DeleteEntry;

