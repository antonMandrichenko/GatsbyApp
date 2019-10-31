import { userTypes } from "../types/user.types";

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