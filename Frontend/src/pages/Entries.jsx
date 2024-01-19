import { useEffect, useState } from "react";

function Entries() {
    const [data, setData] = useState([]);

    console.log(data);

    useEffect(() => {
        async function fetchData() {
            try {
                const { VITE_API_URL } = import.meta.env;
                const response = await fetch(`${VITE_API_URL}/entries`);

                if (!response.ok) {
                    throw new Error(
                        "Server response was not ok " + response.statusText
                    );
                }

                const body = await response.json();

                setData(body.data.entries);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <main>
            <h1>Las recomendaciones de nuestros viajeros 👇🏽</h1>
            <ul>
                {Object.values(data).map(
                    ({ title, sortDescription, createdAt, username }, id) => (
                        <li key={id}>
                            <h2>{title}</h2>
                            <img
                                // src={`http://localhost:8000/entries/uploads/${entrie.photos[1].name}`}
                                alt="Imágen del viaje"
                            />
                            <p>
                                {username}
                                {" | "}
                                {sortDescription}
                            </p>
                            <p>Creado el {Date(createdAt)}</p>
                        </li>
                    )
                )}
            </ul>
        </main>
    );
}

export default Entries;
