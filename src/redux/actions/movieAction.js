import * as actionTypes from "./actionTypes"

export function getMovieSuccess(movie){
    return {type:actionTypes.GET_MOVIE_SUCCESS, payload:movie}
}
export function changeMovie(movie){
    return {type:actionTypes.CHANGE_MOVIE, payload:movie}
}

export function getMovie(moveiesId,page=1,language="tr-TR"){
    return function(dispatch){
        let id=1;
        let genresUrl="without_genres="+id
        let url="https://api.themoviedb.org/3/discover/movie?api_key=c377a4de61abbc33e2fbb5bc071c6537&language="+language+"&sort_by=popularity.desc&"+genresUrl+"&page="+page;
        if(moveiesId){
            url=url+"&with_genres="+moveiesId
            console.log(url)
        }
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getMovieSuccess(result.results)));
    }
}