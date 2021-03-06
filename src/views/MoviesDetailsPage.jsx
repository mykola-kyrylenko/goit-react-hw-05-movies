import React, { useEffect, useState } from "react";
import { Route, NavLink, useLocation, useHistory, useRouteMatch} from "react-router-dom";
import Cast from "../components/Cast/Cast"
import Reviews from "../components/Reviews/Reviews";
import { getFilmById } from "../services/api";
import Button from "@material-ui/core/Button";
import s from "./MovieDetailsPage.module.css";

const imgUrl = "https://image.tmdb.org/t/p/w500/";
const defaultPoster = "https://media.comicbook.com/files/img/default-movie.png";

export default function MovieDetails() {
    const [state, setState] = useState({});
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        let cleanupFunction = false;
        if (location.state?.id) {
            getFilmById(location.state.id).then((resp) => {
                if (!cleanupFunction) {
                    setState((prev) => ({
                        ...prev,
                        film: resp.data,
                    }));
                }
            });
        }
        return () => (cleanupFunction = true);
    }, [location.state.id]);

    return (
        
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    history.push(location.state.from, {
                        search: location.state.search,
                    });
                }}
            >
                go back
            </Button>
            <div className={s.Wrapper}>
                <div className={s.NameAndBanner}>
                    <h1>{state.film?.original_title}</h1>
                    <img
                        src={state.film?.poster_path !== null &&
                            state.film?.poster_path !== undefined
                            ? imgUrl + state.film.poster_path
                            : defaultPoster
                        }
                        alt={state.film?.tagline}
                        width="300"
                    />
                </div>
                <div className={s.Description}>
                    <h3>Film info</h3>
                    <p style={{ width: "600px", margin: "0 auto" }}>{state.film?.overview}</p>
                    <div className={s.ClassAndReview}>
                    <NavLink
                        style={{
                            textDecoration: "none",
                        }}
                        to={{
                            pathname: `${match.url}/cast`,
                            state: location.state,
                        }}
                    >
                        <Button style={{ fontSize: "28px" }} color="primary">
                            Cast
                        </Button>
                    </NavLink>
                    <NavLink
                        style={{ textDecoration: "none", }}
                        to={{
                            pathname: `${match.url}/reviews`,
                            state: location.state,
                        }}>
                        <Button style={{ fontSize: "28px", margin: "0 auto" }} color="primary">
                            Reviews
                        </Button>
                    </NavLink>
                    <Route path={`${match.path}/reviews`} exact component={Reviews} />
                        <Route path={`${match.path}/cast`} exact component={Cast} />
                        </div>
                </div>
            </div>
        </div>
    );
   
};


 

