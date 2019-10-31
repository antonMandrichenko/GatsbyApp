import { userTypes } from "../types/user.types"

export const userActions = {
  loginSuccess,
  logout,
}

function loginSuccess(token) {
  return {
    type: userTypes.LOGIN_SUCCESS,
    token,
  }
}

function logout(props) {
  return dispatch => {
    localStorage.clear()
    dispatch({ type: userTypes.LOGOUT })
  }
}
