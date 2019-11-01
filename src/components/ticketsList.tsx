import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import TicketInList from "./ticketInList"
import TicketContext, {
  usersTypes,
  ticketsTypes,
} from "../context/TicketContext"
import LoadingData from "./LoadingData"
import UpdateTicket from "./UpdateTicket"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function TicketsList() {
  const classes = useStyles()

  const addedButton = (text: string, callback: Function) => (
    <Button variant="contained" color="secondary" onClick={callback}>
      {text}
    </Button>
  )

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
        setCompleted
      }) => (
        <List className={classes.root}>
          <UpdateTicket
            callback={addTicket}
            isLoading={isLoading}
            text="added"
            addedButton={addedButton}
          />
          {(isLoading && !tickets.length) ? (
            <LoadingData />
          ) : (
            tickets && tickets.map(ticket => {
              return (
                <ListItem key={ticket.id}>
                  <TicketInList
                    ticket={ticket}
                    users={users}
                    deleteTicket={deleteTicket}
                    updateTicket={updateTicket}
                    setTicketId={setTicketId}
                    setCompleted={setCompleted}
                  />
                </ListItem>
              )
            })
          )}
          {isLoading && tickets.length > 0 && <LoadingData />}
        </List>
      )}
    </TicketContext.Consumer>
  )
}
