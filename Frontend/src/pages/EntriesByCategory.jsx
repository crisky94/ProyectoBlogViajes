import GetEntriesByCategory from "../components/GetEntriesByCategory";

import { useParams } from "react-router-dom";

const EntriesByCategory = () => {
    const { entriesCategory } = useParams();

    return (
        <>
            <GetEntriesByCategory match={{ params: { entriesCategory } }} />
        </>
    );
};

export default EntriesByCategory;
