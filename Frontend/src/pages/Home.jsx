import Entries from "./Entries";
import Sidebar from "../components/SideBar";
import "../styles/home.css";

function Home({ theme }) {
    return (
        <div className="home-container">
            <section className="sidebar-container">
                <Sidebar theme={theme} />
            </section>
            <main className="main-container">
                <Entries />
            </main>
        </div>
    );
}

export default Home;
