import React from "react"
import { unmountComponentAtNode } from "react-dom"
import ReactTestRenderer from "react-test-renderer"
import { render, fireEvent } from "@testing-library/react"
import IndexPage from "./index"

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

test("IndexPage render", () => {
  const token = "Annnnnnn"
  const { queryByText, getByText, asFragment } = render(<IndexPage />)

  expect(asFragment()).toMatchSnapshot()
})
