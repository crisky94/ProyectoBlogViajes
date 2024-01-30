import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Register from "./pages/Register";
import Entries from "./pages/Entries";
import NewEntry from "./pages/NewEntry";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EntryDetail from "./components/EntryDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EntriesByPlace from "./pages/EntriesByPlace";
import EntriesByCategory from "./pages/EntriesByCategory";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <Header />
            <header>
                <Routes>
                    <Route path="/newEntry" element={<NewEntry />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Entries />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/entries/place/:entriesPlace"
                        element={<EntriesByPlace />}
                    />
                    <Route
                        path="/entries/category/:entriesCategory"
                        element={<EntriesByCategory />}
                    />
                    <Route path="/entries/:entryId" element={<EntryDetail />} />
                </Routes>
            </header>
            <Footer />
        </>
    );
}

export default App;
