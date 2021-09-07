import { useEffect, useState } from 'react';
import { getTrendingFilms } from "../services/api";
import FilmList from '../components/FilmList/FilmList';
// import { cleanup } from '@testing-library/react';


const HomePage = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        // let cleanUp
        const fn = async() => {
            const {
                data: { results },
            } = await getTrendingFilms();
            setFilms(results);
        };
        fn();
    }, []);
    return (
        <div>
            <h2 style={{ fontSize: "40px" }}>Trending today</h2>
            <FilmList films={films} />
        </div>


    );
};

export default HomePage;