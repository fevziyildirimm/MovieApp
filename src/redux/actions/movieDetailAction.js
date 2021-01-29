import * as actionTypes from "./actionTypes";

export function getMovieDetailSuccess(movieDetail) {
 /*   return function (dispatch) {
   if (movieDetail.overview === " ") {
      console.log("gelmedi");
      console.log(movieDetail.id);
     // dispatch(getMovieDetail(movieDetail.id, "en-US"));
      
    } else { 
        console.log(movieDetail.overview);*/
      return {
        type: actionTypes.GET_MOVIE_DETAIL_SUCCESS,
        payload: movieDetail,
      
  };
}
let overviewTr=""
export function getMovieDetail(movieId, lang = "tr-TR") {
  return function (dispatch) {
    let id =
      movieId + "?api_key=c377a4de61abbc33e2fbb5bc071c6537&language=" + lang;
    let url = "https://api.themoviedb.org/3/movie/" + id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {if (result.overview==="") {
            dispatch(getMovieDetail(result.id,"en-US"))
            overviewTr="Malesef Türkçe açıklama bulamadık.Bunun yerine filmin orjinal açıklmasını görmektesiniz. . ."
      }
      else{
        result.overview=overviewTr+result.overview
          dispatch(getMovieDetailSuccess(result));
          overviewTr=""
        }
      });
  };
}
