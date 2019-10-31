import { userActions } from "./user.actions"
import { userTypes } from "../types/user.types"

describe("userActions", () => {
  it("loginSuccess", () => {
    const token = "Anytttt"
    const expectedAction = {
      type: userTypes.LOGIN_SUCCESS,
      token
    }
    expect(userActions.loginSuccess(token)).toEqual(expectedAction)
  })
})
