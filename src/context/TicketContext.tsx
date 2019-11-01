import React, { useState, useEffect } from "react"
import { BackendService, Ticket } from "../../backend.service"


const backend = new BackendService()

export type ticketsTypes = {
  id: number
  description: string
  assigneeId: number | null
  completed: boolean
}

export type usersTypes = {
  id: number
  name: string
}

interface defaultStateTypes {
  tickets: Array<ticketsTypes>
  users: Array<usersTypes>
  isLoading: boolean
}

const defaultState: defaultStateTypes = {
  tickets: [],
  users: [],
  isLoading: true,
}
const TicketContext = React.createContext(defaultState)

type Props = {
  children: object
}

function TicketProvider(props: Props) {
  const { children } = props

  const [tickets, setTickets] = useState<ticketsTypes[]>([])
  const [users, setUsers] = useState<usersTypes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getDataFromApi = async () => {
    setIsLoading(true)
    const ticketsData = await backend.tickets()
    const usersData = await backend.users()
    if (ticketsData && usersData) {
      setIsLoading(false)
    }
    setTickets(ticketsData)
    setUsers(usersData)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  const deleteTicket = async (id: number) => {
    console.log("delete", id)
    setTickets(tickets.filter(ticket => ticket.id !== id))
    console.log("ticket deleted")
  }

  const addTicket = async (opt: Pick<Ticket, 'description'>) => {
    setIsLoading(true)
    await backend.newTicket(opt)
    setIsLoading(false)
    console.log("added")
    getDataFromApi()
  }

  const updateTicket = (opt: Ticket) => {
    if(opt.description === "") {
      return;
    }
    const findTicket = tickets.find(ticket => ticket.id === opt.id)
    if(findTicket) {
      findTicket.description = opt.description
      setTickets(tickets.map(ticket => {
        if(ticket.id === findTicket.id) {
          return findTicket;
        }
        return ticket;
      }))
    }
  }

  return (
    <TicketContext.Provider
      value={{
        tickets,
        users,
        isLoading,
        deleteTicket,
        addTicket,
        updateTicket
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}
export default TicketContext
export { TicketProvider }
