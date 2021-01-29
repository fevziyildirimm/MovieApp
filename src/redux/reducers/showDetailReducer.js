import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function showDetailReducer(state=initialState.showDetail,action){
    switch (action.type) {
        case actionTypes.GET_SHOW_DETAIL_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}