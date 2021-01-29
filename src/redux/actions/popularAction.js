import * as actionTypes from "./actionTypes"

export function getPopularSuccess(popular){
    return {type:actionTypes.GET_POPULAR_SUCCESS, payload:popular}
}

let page = 0;
export function getPopular(getpage){
    if (getpage) {
        page=0;
    }
      page++;
      console.log("sayfa=" + page);
    return function(dispatch){
        let url="https://api.themoviedb.org/3/movie/popular?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=tr-TR&page="+page;
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getPopularSuccess(result.results)));
    }
}