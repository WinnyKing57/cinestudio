import { BrowserRouter, Route, Routes } from "react-router";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AllFilms from './Films.jsx';
import DetailFilms from './DetailFilms.jsx';
import SearchFilms from './SearchFilms.jsx';
import NotFound from './NotFound.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<AllFilms />} />
                <Route path="/movies/search" element={<SearchFilms />} />
                <Route path="/movies/:id" element={<DetailFilms />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}