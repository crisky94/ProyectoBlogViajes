import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <header>
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
            </header>
        </>
    );
}

export default App;
