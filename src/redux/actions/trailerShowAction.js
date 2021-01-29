import * as actionTypes from "./actionTypes"

export function getShowTrailerSuccess(trailer){
    return {type:actionTypes.GET_SHOW_TRAILER_SUCCESS, payload:trailer}
}


export function getShowTrailer(showId){
    return function(dispatch){
        let id=showId+"/videos?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=en-US"
        let url="https://api.themoviedb.org/3/tv/"+id;
        console.log(url);
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getShowTrailerSuccess(result.results)));
    }
}