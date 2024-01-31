const deleteEntryService = async ({ id, token }) => {
    const url = `${import.meta.env.VITE_API_URL}/entries/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);
};

export default deleteEntryService;
