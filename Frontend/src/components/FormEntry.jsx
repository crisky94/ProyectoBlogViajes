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
                    <input id="title" type="text" name="title" minLength={"3"} maxLength={"50"} placeholder="Min. 3..." required />
                    <label htmlFor="title">Título:<span className="required">*</span> </label>
                </div>

                <div className="box">
                    <input id="place" type="text" name="place" minLength={"3"} maxLength={"50"} placeholder="Min. 3..." required />
                    <label htmlFor="place">Lugar:<span className="required">*</span> </label>
                </div>
                <div className="category">
                    {""}
                    <label>Categoría:<span className="required">*</span> </label>
                    <select className="select" name="category" required>
                        <option value="">SELECCIONA CATEGORÍA</option>
                        <option value="Aventura">AVENTURA</option>
                        <option value="Single">SINGLE</option>
                        <option value="Parejas">PAREJA</option>
                        <option value="Familia">FAMILIA</option>
                        <option value="Cultura">CULTURA</option>
                        <option value="Gastronomía">GASTRONOMÍA</option>
                        <option value="Playa">PLAYA</option>
                        <option value="Montaña">MONTAÑA</option>
                        <option value="Naturaleza">NATURALEZA</option>
                    </select>
                </div>

                <div className="box">
                    <textarea id="sortDescription" className={"sortDescription"} name="sortDescription" minLength={"10"} maxLength={"200"}  placeholder="Min. 10..." required></textarea>
                    <label htmlFor="sortDescription">Breve descripción:<span className="required">*</span> </label>
                </div>

                <div className="box">
                    <textarea id="description" minLength={"30"} maxLength={"800"}  placeholder="Min. 30..." name="text" required></textarea>
                    <label htmlFor="description">Descripción:<span className="required">*</span> </label>
                </div>

                {previewImage ? (
                    <img className={"preview-image"} src={URL.createObjectURL(previewImage)} alt="Imagen del viaje" />
                ) : null}
                 <label className="labelFile">Selecciona imagen:<span className="required">*</span></label>
                
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

                <button type="submit" className="button border">
                    Subir Post
                </button>
            </form>
        </div>
    );
};
export default FormEntry;
