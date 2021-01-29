import * as actionTypes from "./actionTypes"

export function getShowCategoriesSuccess(genres){
    return {type:actionTypes.GET_SHOW_CATEGORIES_SUCCESS, payload:genres}
}

export function getShowCategories(){
    return function(dispatch){
        let url="https://api.themoviedb.org/3/genre/tv/list?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=en-US";
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getShowCategoriesSuccess(result.genres)));
    }
}