import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function categoryShowListReducer(state=initialState.genresShow,action){
    switch (action.type) {
        case actionTypes.GET_SHOW_CATEGORIES_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}