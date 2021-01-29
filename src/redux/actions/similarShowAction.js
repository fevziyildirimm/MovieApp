import * as actionTypes from "./actionTypes";

export function getSimilarShowSuccess(similar) {
  return { type: actionTypes.GET_SHOW_SIMILAR_SUCCESS, payload: similar };
}

let page = 0;
let prevmovieid = "";
export function getShowSimilar(showId) {
  if (prevmovieid !== showId) {
    prevmovieid = showId;
    page = 0;
  }

  page++;
  console.log("sayfa=" + page);

  return function (dispatch) {
    let id =
      showId +
      "/similar?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=tr-TR&page=" +
      page;
    let url = "https://api.themoviedb.org/3/tv/" + id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getSimilarShowSuccess(result.results)));
  };
}
