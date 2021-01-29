import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function similarShowListReducer(state=initialState.similarShow,action){
    switch (action.type) {
        case actionTypes.GET_SHOW_SIMILAR_SUCCESS: 
            return action.payload
        case actionTypes.GET_SHOW_CHANGE_SUCCESS:
            const newState=state.filter(item=>item.id!==action.payload)
            return newState    
        default:
            return state;
    }
}