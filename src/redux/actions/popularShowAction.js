import * as actionTypes from "./actionTypes"

export function getShowPopularSuccess(popular){
    return {type:actionTypes.GET_SHOW_POPULAR_SUCCESS, payload:popular}
}

let page = 0;
export function getShowPopular(getpage){
    if (getpage) {
        page=0;
    }
      page++;
      console.log("sayfa=" + page);
    return function(dispatch){
        let url="https://api.themoviedb.org/3/tv/popular?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=tr-TR&page="+page;
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getShowPopularSuccess(result.results)));
    }
}