
const deleteEntryService = async ({id}) => {
    const url = `${import.meta.env.VITE_API_URL}/entries/${id}`;
   
    const response = await fetch(url, {
        method: 'DELETE',
        // headers:{
        //     authorization: token
        // }
    });

    const json = await response.json();

    if(!response.ok) throw new Error(json.message);

    
}

export default deleteEntryService;