import React from "react"
import renderer from "react-test-renderer"
import {PureLayout as Layout} from "../layout"
describe("Layout", () => {
  it("renders correctly", () => {
    const data = {
        site: {
          siteMetadata: {
            title: "Gatsby Starter Blog",
          },
        },
      }
    const tree = renderer.create(<Layout data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
