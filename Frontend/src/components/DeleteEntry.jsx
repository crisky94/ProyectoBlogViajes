import { useState } from "react";
import deleteEntryService from "../services/deleteEntryService";
import "../styles/entries.css";

const DeleteEntry = ({ id }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState("");

    const DeletePopup = ({ show, onDelete, onCancel }) => {
        if (!show) return null;
        return (
            <div className={"popup"}>
                <div className={"popup-inner"}>
                    <h3>
                        ¿Estás segurx de que quieres borrar esta publicación?
                    </h3>
                    <button onClick={onDelete}>Sí, borrar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        );
    };
    const handleDelete = async () => {

        try {
            const token = localStorage.getItem("token");
            await deleteEntryService({ id, token });
            console.log("Publicacion borrada con exito!");
            setShowPopup(false);
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <button
                className={"delete-button"}
                onClick={() => setShowPopup(true)}
            >
                <span className="material-symbols-outlined">delete</span>
            </button>
            <DeletePopup
                show={showPopup}
                onDelete={handleDelete}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default DeleteEntry;
