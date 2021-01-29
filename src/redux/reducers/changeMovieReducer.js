import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function changeMovieReducer(state=initialState.currentMovie,action){
    switch (action.type) {
        case actionTypes.CHANGE_MOVIE:
            
            return action.payload
    
        default:
            return state;
    }
}