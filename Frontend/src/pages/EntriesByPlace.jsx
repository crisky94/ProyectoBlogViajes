import { useParams } from "react-router-dom";
import GetEntriesByPlace from "../components/GetEntriesByPlace";

const EntriesByPlace = () => {
    const { entriesPlace } = useParams();

    return (
        <>
            <GetEntriesByPlace entriesPlace={entriesPlace} />
        </>
    );
};

export default EntriesByPlace;
