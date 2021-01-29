import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function showListReducer(state=initialState.show,action){
    switch (action.type) {
        case actionTypes.GET_SHOW_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}