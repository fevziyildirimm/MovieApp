import {combineReducers} from "redux"
import changeCategoryReducer from "./changeCategoryReducer"
import categoryListReducer from "./categoryListReducer"
import movieListReducer from "./movieListReducer"
import popularListReducer from "./popularListReducer"
import changeMovieReducer from "./changeMovieReducer"
import similarListReducer from "./similarListReducer"
import movieDetailReducer from "./movieDetailReducer"
import trailerReducer from "./trailerReducer"
import searchReducer from "./searchReducer"
import categoryShowListReducer from "./categoryShowListReducer"
import showListReducer from "./showListReducer"
import similarShowListReducer from "./similarShowListReducer"
import showDetailReducer from "./showDetailReducer"
import changeShowReducer from "./changeShowReducer"
import trailerShowReducer from "./trailerShowReducer"
import popularShowListReducer from "./popularShowListReducer"
import userDetailReducer from "./userDetailReducer"


const rootReducer =combineReducers({
    changeCategoryReducer,
    categoryListReducer,
    movieListReducer,
    popularListReducer,
    changeMovieReducer,
    similarListReducer,
    movieDetailReducer,
    trailerReducer,
    searchReducer,
    categoryShowListReducer,
    showListReducer,
    similarShowListReducer,
    showDetailReducer,
    changeShowReducer,
    trailerShowReducer,
    popularShowListReducer,
    userDetailReducer,
})

export default rootReducer;