import { BrowserRouter, Route, Routes } from "react-router";
import AllFilms from './Films.jsx';
import DetailFilms from './DetailFilms.jsx';
import SearchFilms from './SearchFilms.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllFilms />} />
                <Route path="/movies/search" element={<SearchFilms />} />
                <Route path="/movies/:id" element={<DetailFilms />} />
            </Routes>
        </BrowserRouter>
    );
}