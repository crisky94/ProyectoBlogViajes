const newEntryService = async ({ data, token }) => {
    const url = `${import.meta.env.VITE_API_URL}/entries`;

    const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json.data;
};

export default newEntryService;
