import { user as reducer } from "./user.reducer"
import { userTypes } from "../types/user.types"

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: userTypes.LOGIN_SUCCESS,
          token: "2222222",
        }
      )
    ).toEqual({
      token: "2222222",
    })

    expect(
      reducer(
        {
          token: "222222",
        },
        {
          type: userTypes.LOGIN_SUCCESS,
          token: "333333",
        }
      )
    ).toEqual({
      token: "333333",
    })
  })
})
