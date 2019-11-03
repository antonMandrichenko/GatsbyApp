import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Error from "../components/Error"

const Layout: React.FC = ({children}) => {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item lg={6} xs={12}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="h4">ABOUT TICKETS</Typography>
            </Toolbar>
          </AppBar>
          {children}
        </Grid>
      </Grid>
      <Error />
    </React.Fragment>
  )
}

export default Layout
