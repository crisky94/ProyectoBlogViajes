const registerUserService = async ({ username, email, password }) => {
    const url = `${import.meta.env.VITE_API_URL}/users/register`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
            const json = await res.json();
            throw new Error(json.message);
        }

        return await res.json();
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
};

export default registerUserService;
