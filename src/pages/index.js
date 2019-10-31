import React from "react"
import { Link } from "gatsby"
import { useSelector, useDispatch } from "react-redux"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { userActions } from "../store/actions/user.actions"

const IndexPage = (props) => {
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <div>{token}</div>
      <button
        onClick={() => {
          dispatch(userActions.loginSuccess("Annnnnnn"))
        }}
      >
        Get token
      </button>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
