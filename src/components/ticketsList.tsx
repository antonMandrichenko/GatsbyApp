import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import TicketInList from "./ticketInList"
import TicketContext from "../context/TicketContext"
import LoadingData from "./LoadingData"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function TicketsList() {
  const classes = useStyles()

  return (
    <TicketContext.Consumer>
      {({ tickets, isLoading, users, deleteTicket }) => (
        <List className={classes.root}>
          {isLoading ? (
            <LoadingData />
          ) : (
            tickets.map(ticket => {
              return (
                <ListItem key={ticket.id}>
                  <TicketInList
                    ticket={ticket}
                    users={users}
                    deleteTicket={deleteTicket}
                  />
                </ListItem>
              )
            })
          )}
        </List>
      )}
    </TicketContext.Consumer>
  )
}
