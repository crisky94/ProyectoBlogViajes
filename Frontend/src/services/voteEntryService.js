// const voteEntryService = async ({ token, id }) => {
//     const url = `${import.meta.env.VITE_API_URL}/entries/${id}/votes`;

//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const json = await response.json();

//     if (!response.ok) throw new Error(json.message);

//     return json.data;
// };

// export default voteEntryService;
const voteEntryService = async ({ token, id, value = 1 }) => {
    const url = `${import.meta.env.VITE_API_URL}/entries/${id}/votes`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }), // 👈 Aquí enviamos el valor
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json.data;
};

export default voteEntryService;
