import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function searchReducer(state=initialState.search,action){
    switch (action.type) {
        case actionTypes.GET_SEARCH_SUCCESS: 
        if (action.payload===undefined) {
            return []
        }
            return action.payload
        default:
            return state;
    }
}