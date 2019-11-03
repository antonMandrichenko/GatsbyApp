import React, { useContext } from "react"
import Checkbox from "@material-ui/core/Checkbox"
import AppContext from "../context/AppContext"

const CompleteTicket: React.FC = ({ ticket }: any) => {
  const { setCompleteTicket, loadingData } = useContext(AppContext)

  return (
    <Checkbox
      disabled={loadingData}
      checked={ticket.completed}
      onChange={(e: React.ChangeEvent, completed: boolean) => {
        setCompleteTicket({ completed, ticketId: ticket.id })
      }}
      value="completed"
      color="secondary"
      inputProps={{
        "aria-label": "secondary checkbox",
      }}
    />
  )
}

export default CompleteTicket
