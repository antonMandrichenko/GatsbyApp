import React from "react"
import { Link } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import Image from "../components/image"
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
