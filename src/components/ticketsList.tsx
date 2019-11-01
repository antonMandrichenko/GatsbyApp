import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import TicketInList from "./ticketInList"
import Grid from "@material-ui/core/Grid"
import TicketContext from "../context/TicketContext"
import LoadingData from "./LoadingData"
import UpdateTicket from "./UpdateTicket"
import SortBy from "./SortBy"
import ErrorSnackBar from "./ErrorSnackBar"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function TicketsList() {
  const classes = useStyles()

  const addedButton: React.SFC<{
    text: string
    callback: Function
  }> = ( text, callback ) => {
    return (
      <Button variant="contained" color="secondary" onClick={callback}>
        {text}
      </Button>
    )
  }

  return (
    <TicketContext.Consumer>
      {({
        tickets,
        isLoading,
        users,
        deleteTicket,
        addTicket,
        updateTicket,
        setTicketId,
        setCompleted,
        sortBy,
        assignUser,
        isError,
        errorMessage,
      }) => (
        <List className={classes.root}>
          <Grid container>
            <Grid item xs={8}>
              <UpdateTicket
                callback={addTicket}
                isLoading={isLoading}
                text="added"
                addedButton={addedButton}
              />
            </Grid>
            <Grid item xs={4}>
              <SortBy sortBy={sortBy} />
            </Grid>
          </Grid>

          {isLoading && !tickets.length ? (
            <LoadingData />
          ) : (
            tickets &&
            tickets.map(ticket => {
              return (
                <ListItem key={ticket.id}>
                  <TicketInList
                    ticket={ticket}
                    users={users}
                    deleteTicket={deleteTicket}
                    updateTicket={updateTicket}
                    setTicketId={setTicketId}
                    setCompleted={setCompleted}
                    assignUser={assignUser}
                  />
                </ListItem>
              )
            })
          )}
          {isLoading && tickets.length > 0 && <LoadingData />}
          <ErrorSnackBar isError={isError} errorMessage={errorMessage} />
        </List>
      )}
    </TicketContext.Consumer>
  )
}
