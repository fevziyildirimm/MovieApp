import * as actionTypes from "./actionTypes"

export function getShowSuccess(show){
    return {type:actionTypes.GET_SHOW_SUCCESS, payload:show}
}

export function changeShow(show){
    return {type:actionTypes.CHANGE_SHOW, payload:show}
}

export function getShow(showId,page=1){
    return function(dispatch){
        let id=1;
        let genresUrl="without_genres="+id
        let url="https://api.themoviedb.org/3/discover/tv?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=en-US&sort_by=popularity.desc&"+genresUrl+"&page="+page;
        if(showId){
            url=url+"&with_genres="+showId
            console.log(url)
        }
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getShowSuccess(result.results)));
    }
}