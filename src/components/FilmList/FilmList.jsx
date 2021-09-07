import FilmListItem from './FilmListItem';

const FilmList = ({ films, query }) => {
    return (
        <ul>
            {films.map((film) => (
                <FilmListItem key={film.id} film={film} query={ query}/>
            ))}
        </ul>
    );
};

export default FilmList;