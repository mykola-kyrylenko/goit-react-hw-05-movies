import {Link, useLocation} from 'react-router-dom';
import s from "./FilmListItem.module.css";

const FilmListItem = ({ film, query }) => {
    const location = useLocation();

    return (
        <li  className={ s.FilmList}>
            <Link
                to={{
                    pathname: `/movies/${film.id}`,
                    state: {
                        search: query !== undefined ? query : "",
                        id: film.id,
                        from: location.pathname,
                    },
                }}
            >
                {film.title}
            </Link>
        </li>
    );
};

export default FilmListItem;