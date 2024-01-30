function ImageGallery({ photos }) {
    if (!photos || photos.length === 0) {
        return <p>La entrada no contiene imágenes todavía</p>;
    }

    return (
        <div>
            {photos.map((photoName, index) => {
                const imageUrl = `${
                    import.meta.env.VITE_API_URL
                }/uploads/${photoName}`;

                return (
                    <img
                        key={index}
                        className="img-entries"
                        src={imageUrl}
                        alt={`Image ${index}`}
                        onError={() =>
                            console.error(
                                `Error loading image ${index} from ${imageUrl}`
                            )
                        }
                    />
                );
            })}
        </div>
    );
}

export default ImageGallery;
