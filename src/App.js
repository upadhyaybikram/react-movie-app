
import "./styles.css";
import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=4a3b711b`;

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchMovies = (url) => {
        dispatch({ type: "SEARCH_MOVIES_REQUEST" });

        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.Response === "True") {
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    });
                } else {
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        error: jsonResponse.Error
                    });
                }
            });
    };

    useEffect(() => {
        fetchMovies(MOVIE_API_URL);
    }, []);

    const resetState = () => {
        fetchMovies(MOVIE_API_URL);
    };

    const search = (searchValue) => {
        fetchMovies(`https://www.omdbapi.com/?s=${searchValue}&apikey=${OMDB_API_KEY}`);
    };

    const { movies, errorMessage, loading } = state;

    return (
        <div className="App">
            <Header text="MOVIE APP" onClick={resetState} />
            <Search search={search} />
            <p className="App-intro">Find your favourite movie here</p>
            <div className="movies">
                {loading && !errorMessage ? (
                    <span>loading... </span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    movies.map((movie, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default App;
