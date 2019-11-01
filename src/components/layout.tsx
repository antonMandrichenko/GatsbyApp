import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
  },
  margin: {
    marginTop: "1rem",
    height: "85vh",
    overflow: "hidden",
    overflowY: "auto"
  },
}))

type Props = {
  children: object
}

export default function Layout(props: Props) {
  const { children } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" className={classes.title}>
              Tickets app
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <Grid item lg={6} md={8} sm={10} xs={12} className={classes.margin}>
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
