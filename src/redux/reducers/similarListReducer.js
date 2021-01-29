import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function similarListReducer(state=initialState.similar,action){
    switch (action.type) {
        case actionTypes.GET_SIMILAR_SUCCESS: 
            return action.payload
        case actionTypes.GET_MOVIE_CHANGE_SUCCESS:
            const newState=state.filter(item=>item.id!==action.payload)
            return newState    
        default:
            return state;
    }
}