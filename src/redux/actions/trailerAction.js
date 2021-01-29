import * as actionTypes from "./actionTypes"

export function getTrailerSuccess(trailer){
    return {type:actionTypes.GET_MOVIE_TRAILER_SUCCESS, payload:trailer}
}


export function getTrailer(movieId){
    return function(dispatch){
        let id=movieId+"/videos?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=en-US"
        let url="https://api.themoviedb.org/3/movie/"+id;
        console.log(url);
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getTrailerSuccess(result.results)));
    }
}