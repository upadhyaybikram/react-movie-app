import "./styles.css";
import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const MOVIE_API_URL_1 = "http://www.omdbapi.com/?i=tt3896198&apikey=95e5f071";

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

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log("Movie API URL Response:", jsonResponse);
                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                });
            });
    }, []);

    const search = (searchValue) => {
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
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

    const { movies, errorMessage, loading } = state;

    return (
        <div className="App">
            <Header text="MOVIE APP" />
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
