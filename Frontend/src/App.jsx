import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Register from "./pages/Register";
import Entries from "./pages/Entries";

function App() {
    return (
        <>
            <header>
                <Routes>
                    <Route path="/" element={<Entries />} />
                    <Route path="*" element={<Entries />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </header>
        </>
    );
}

export default App;
