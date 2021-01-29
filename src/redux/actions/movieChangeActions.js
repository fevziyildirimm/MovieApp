import * as actionTypes from "./actionTypes"

export function movieChangeSuccess(movie){
    return {type:actionTypes.GET_MOVIE_CHANGE_SUCCESS, payload:movie}
}