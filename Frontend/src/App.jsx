import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Register from "./pages/Register";
import Entries from "./pages/Entries";
import NewEntry from "./pages/NewEntry";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EntryDetail from "./components/EntryDetail";

function App() {
    return (
        <>
            <Header />
            <header>
                <Routes>
                    <Route path="/newEntry" element={<NewEntry />} />
                    <Route path="/" element={<Entries />} />
                    <Route path="*" element={<Entries />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/entries/:entryId" element={<EntryDetail />} />
                </Routes>
            </header>
            <Footer />
        </>
    );
}

export default App;
