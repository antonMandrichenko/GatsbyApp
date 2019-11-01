import React, { FunctionComponent, Component } from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { ticketsTypes, usersTypes } from "../context/TicketContext"

const useStyles = makeStyles({
  card: {
    width: "100%",
    padding: "1rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
})

type IconsButtonProps = {
  type: string
  Icon: Function
  deleteTicket: CallableFunction
  id: number
}

export default function IconsButton({ type, Icon, deleteTicket, id }: IconsButtonProps) {
  const classes = useStyles()

return <IconButton aria-label={type} onClick={() => {deleteTicket(id)}}>{<Icon fontSize="large" />}</IconButton>
}
