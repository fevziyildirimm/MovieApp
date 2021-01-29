import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function trailerShowReducer(state=initialState.trailerShow,action){
    switch (action.type) {
        case actionTypes.GET_SHOW_TRAILER_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}