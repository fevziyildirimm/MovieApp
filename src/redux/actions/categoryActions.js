import * as actionTypes from "./actionTypes"

export function changeCategory(category){
    return {type:actionTypes.CHANGE_CATEGORY, payload:category}
}

export function getCategoriesSuccess(genres){
    return {type:actionTypes.GET_CATEGORIES_SUCCESS, payload:genres}
}

export function getCategories(){
    return function(dispatch){
        let url="https://api.themoviedb.org/3/genre/movie/list?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=en-US";
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getCategoriesSuccess(result.genres)));
    }
}