import React from "react"
import IndexPage from "./index"
import ReactTestRenderer from "react-test-renderer"
import { StaticQuery } from "gatsby"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import rootReducer from "../../__mocks__/reducers"

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `Default Starter`,
        },
      },
    })
  )
})
const initialState = {}
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(reduxThunk)
)

describe("IndexPage render", () => {
  // it("renders correctly", () => {
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       <IndexPage />
  //     </Provider>
  //   )
  //   let tree = component.toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  it("CheckboxWithLabel changes the text after click", () => {
    const component = ReactTestRenderer.create(
      <Provider store={store}>
        <IndexPage />
      </Provider>
    )
    let tree = component.toJSON()

    expect(tree).toBeTruthy()

    // fireEvent.click(getByLabelText(/off/i))

    // expect(queryByLabelText(/on/i)).toBeTruthy()
  })
})
