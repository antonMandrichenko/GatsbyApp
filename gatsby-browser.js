import React from "react"
import { TicketProvider } from "./src/context/TicketContext"

export const wrapRootElement = ({ element }) => (
  <TicketProvider>{element} </TicketProvider>
)
