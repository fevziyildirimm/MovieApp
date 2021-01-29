import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function movieListReducer(state=initialState.movie,action){
    switch (action.type) {
        case actionTypes.GET_MOVIE_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}