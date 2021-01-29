import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function movieDetailReducer(state=initialState.movieDetail,action){
    switch (action.type) {
        case actionTypes.GET_MOVIE_DETAIL_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}