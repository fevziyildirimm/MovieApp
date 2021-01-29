import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function userDetailReducer(state=initialState.userDetail,action){
    switch (action.type) {
        case actionTypes.GET_USER_DETAIL_SUCCESS:
            console.log(action.payload);
            return action.payload
        default:
            return state;
    }
}