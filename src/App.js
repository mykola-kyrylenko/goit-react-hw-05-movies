import { Switch, Route, Redirect } from "react-router-dom";
import {Suspense, lazy} from "react"
import Navigation from './components/Navigation/Navigation.jsx';
// import HomePage from "./views/HomePage.jsx";
// import MoviesPageSearch from "./views/MoviesPageSearch";
// import MovieDetailsPage from "./views/MoviesDetailsPage";

const HomePage = lazy(() => import('./views/HomePage.jsx'));
const MoviesPageSearch = lazy(() => import('./views/MoviesPageSearch'));
const MovieDetailsPage = lazy(() => import('./views/MoviesDetailsPage'));

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<h1>Loading...</h1>  }>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPageSearch/>
        </Route>
        <Route path="/movies/:id">
          <MovieDetailsPage/>
        </Route>

        </Switch>
        </Suspense> 
      <Redirect to="/"/>
    </div>
  );
};

export default App;
