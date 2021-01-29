import * as actionTypes from "./actionTypes";

export function getSimilarSuccess(similar) {
  return { type: actionTypes.GET_SIMILAR_SUCCESS, payload: similar };
}

let page = 0;
let prevmovieid = "";
export function getSimilar(movieId) {
  if (prevmovieid !== movieId) {
    prevmovieid = movieId;
    page = 0;
  }

  page++;
  return function (dispatch) {
    let id =
      movieId +
      "/similar?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=tr-TR&page=" +
      page;
    let url = "https://api.themoviedb.org/3/movie/" + id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getSimilarSuccess(result.results)));
  };
}
