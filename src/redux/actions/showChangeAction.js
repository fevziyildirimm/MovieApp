import * as actionTypes from "./actionTypes"

export function showChangeSuccess(show){
    return {type:actionTypes.GET_SHOW_CHANGE_SUCCESS, payload:show}
}