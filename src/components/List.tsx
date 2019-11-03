import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import AppContext from "../context/AppContext"
import OneTicketList from "./OneTicketList"
import AddTicket from "./AddTicket"
import FilterTickets from "./FilterTickets"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "100%",
    height: "80vh",
    padding: theme.spacing(1),
  },
}))

export default function List() {
  const classes = useStyles()
  const { loadingData } = useContext(AppContext)

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <AddTicket />
                <FilterTickets />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <OneTicketList />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
