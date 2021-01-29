import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function popularShowListReducer(state=initialState.showPopular,action){
    switch (action.type) {
        case actionTypes.GET_SHOW_POPULAR_SUCCESS: 
            return action.payload
        default:
            return state;
    }
}