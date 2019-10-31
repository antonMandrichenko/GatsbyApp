import React from "react"
import { unmountComponentAtNode } from "react-dom"
import ReactTestRenderer from "react-test-renderer"
import { render, fireEvent } from "@testing-library/react"
import { StaticQuery } from "gatsby"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import rootReducer from "../../__mocks__/reducers"
import IndexPage from "./index"
import Layout from "../components/layout"

let container = null
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

const initialState = {}
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(reduxThunk)
)

test("IndexPage render", () => {
  const token = "Annnnnnn"
  const { queryByText, getByText, asFragment } = render(
    <Provider store={store}>
      <IndexPage>
        <Layout>
          <div>{token}</div>
        </Layout>
      </IndexPage>
    </Provider>
  )
  expect(queryByText(token)).toBeNull()
  fireEvent.click(getByText(/Get token/i))
  expect(asFragment()).toMatchSnapshot()
})
// })
