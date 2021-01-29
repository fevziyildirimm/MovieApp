import * as actionTypes from "./actionTypes"

export function getShowDetailSuccess(ShowDetail){
    return {type:actionTypes.GET_SHOW_DETAIL_SUCCESS, payload:ShowDetail}
}

let overviewTr=""
export function getShowDetail(ShowId,lang="tr-TR"){
    return function(dispatch){
        let id=ShowId+"?api_key=c377a4de61abbc33e2fbb5bc071c6537&language="+lang
        let url="https://api.themoviedb.org/3/tv/"+id;
        console.log(url);
        return fetch(url)
        .then(response=>response.json())
        .then(result=>{if (result.overview==="") {
            dispatch(getShowDetail(result.id,"en-US"))
            overviewTr="Malesef Türkçe açıklama bulamadık.Bunun yerine dizinin orjinal açıklmasını görmektesiniz. . ."
      }
      else{
        result.overview=overviewTr+result.overview
          dispatch(getShowDetailSuccess(result));
          overviewTr=""
        }
      });
    }
}