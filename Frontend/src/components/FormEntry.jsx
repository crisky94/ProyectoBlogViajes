import { useState } from "react";
import newEntryService from "../services/newEntryService";
import "../styles/formEntry.css";
import { useNavigate } from "react-router-dom";

const FormEntry = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData(e.target);
            const token = localStorage.getItem("token");
            await newEntryService({ data, token });
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="entry-box">
            <form className="formEntry" onSubmit={handleSubmit}>
                <div className="box">
                    <input type="text" name="title" required />
                    <label>Título: </label>
                </div>

                <div className="box">
                    <input type="text" name="place" required />
                    <label>Lugar: </label>
                </div>
                <div>
                    {""}
                    <label>Categoría: </label>
                    <select name="category" required>
                        <option value="">Selecciona categoria</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Single">Single</option>
                        <option value="Parejas">Parejas</option>
                        <option value="Familia">Familia</option>
                        <option value="Cultura">Cultura</option>
                        <option value="Gastronomía">Gastronomía</option>
                        <option value="Playa">Playa</option>
                        <option value="Montaña">Montaña</option>
                        <option value="Naturaleza">Naturaleza</option>
                    </select>
                </div>

                <div className="box">
                    <textarea name="sortDescription" required></textarea>
                    <label>Breve descripción: </label>
                </div>

                <div className="box">
                    <textarea className="description" name="text" required></textarea>
                    <label>Descripción: </label>
                </div>

                {previewImage ? (
                    <img src={URL.createObjectURL(previewImage)} alt="iamge" />
                ) : null}
                <label className="labelFile">Selecciona imagen:</label>
                
                    <input
                        className="input-file"
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPreviewImage(e.target.files[0])}
                        multiple="multiple"
                        required
                    />
             


                {error ? <p>{error}</p> : null}

                <button type="submit">
                    Subir Post
                </button>
            </form>
        </div>
    );
};
export default FormEntry;
