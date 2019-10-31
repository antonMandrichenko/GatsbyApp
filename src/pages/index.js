import React from "react"
import { Link } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Button from "@material-ui/core/Button"
import { userActions } from "../store/actions/user.actions"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  }
}))

const IndexPage = () => {
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const classes = useStyles()
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
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          dispatch(userActions.loginSuccess("Annnnnnn"))
        }}
      >
        Get token
      </Button>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
