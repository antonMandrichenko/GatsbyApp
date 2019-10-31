import { userTypes } from "../src/store/types/user.types";
import { combineReducers } from "redux";

const initialState = {};

export function user(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_SUCCESS:
      return {
        token: action.token,
      };
    case userTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user
});

export default rootReducer;