import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function trailerReducer(state=initialState.trailer,action){
    switch (action.type) {
        case actionTypes.GET_MOVIE_TRAILER_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}