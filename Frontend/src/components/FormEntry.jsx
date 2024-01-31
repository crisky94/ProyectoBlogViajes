import { useState } from "react";
import newEntryService from "../services/newEntryService";
import "../styles/formEntry.css";

const FormEntry = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData(e.target);
            const token = localStorage.getItem("token");
            await newEntryService({ data, token });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-box">
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input type="text" name="title" required />
                    <label>Título: </label>
                </div>

                <div className="user-box">
                    <input type="text" name="place" required />
                    <label>Lugar: </label>
                </div>
                <div>
                    {" "}
                    <label>Categoría: </label>
                    <select name="category" required>
                        <option value="">Selecciona categoria</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Naturaleza">Naturaleza</option>
                        <option value="Gastronomia">Gastronomia</option>
                        <option value="Cultura">Cultura</option>
                    </select>
                </div>

                <div className="user-box">
                    <textarea name="sortDescription" required></textarea>
                    <label>Breve descripción: </label>
                </div>

                <div className="user-box">
                    <textarea name="text" required></textarea>
                    <label>Descripción: </label>
                </div>

                {previewImage ? (
                    <img src={URL.createObjectURL(previewImage)} alt="iamge" />
                ) : null}
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPreviewImage(e.target.files[0])}
                    multiple="multiple"
                    required
                />

                {error ? <p>{error}</p> : null}

                <button type="submit">
                    {" "}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Subir Post
                </button>
            </form>
        </div>
    );
};
export default FormEntry;
