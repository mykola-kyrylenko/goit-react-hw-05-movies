import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { getFilmsByQuery } from "../services/api";
import FilmList from '../components/FilmList/FilmList';
import Button from "@material-ui/core/Button";
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: "10px",
        fontSize: "26px",
        verticalAlign: "middle",
    },
}));

const MoviesPageSearch = () => {
    const classes = useStyles();

    const [input, setInput] = useState('');
    const [films, setFilms] = useState([]);

    const history = useHistory();


    const handleChangeQuery = (event) => {
        setInput(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // history.push({
        //     pathname: history.location.pathname,
        //     search: `?q=${input}`
        // });
        // history.push(`?q=${input}`)
        getFilmsByQuery(input).then((resp) => setFilms(resp.data.results));
    };

    useEffect(() => {
        if (history.location.state?.search) {
            getFilmsByQuery(history.location.state?.search).then((resp) => {
                setFilms(resp.data.results);
                setInput(history.location.state?.search);
            });
        }
       
    }, [history])

    return (
        <>
            <form
                onSubmit={handleSubmit}
                
            >
                <input
                    className={classes.root}
                    value={input}
                    type="text"
                    name="query"
                    onChange={handleChangeQuery}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Find
                </Button>
            </form>
            <FilmList films={films} query={ input}/>
        </>
    );
};

export default MoviesPageSearch;