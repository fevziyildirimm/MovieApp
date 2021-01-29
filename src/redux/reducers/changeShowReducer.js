import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function changeShowReducer(state=initialState.currentShow,action){
    switch (action.type) {
        case actionTypes.CHANGE_SHOW:
            
            return action.payload
    
        default:
            return state;
    }
}