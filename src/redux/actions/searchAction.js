import * as actionTypes from "./actionTypes"

export function getSearchSuccess(search){
    return {type:actionTypes.GET_SEARCH_SUCCESS, payload:search}
}


export function getSearch(movieName,page=1){
    return function(dispatch){
        let url="https://api.themoviedb.org/3/search/multi?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=tr-TR&query="+movieName+"&page="+page;
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getSearchSuccess(result.results)));
    }
}