import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function popularListReducer(state=initialState.popular,action){
    switch (action.type) {
        case actionTypes.GET_POPULAR_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}