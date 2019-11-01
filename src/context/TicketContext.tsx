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
  const [selectedTicket, setSelectedTicket] = useState<ticketsTypes | null>(
    null
  )
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const getDataFromApi = async () => {
    setIsLoading(true)
    try {
      const ticketsData = await backend.tickets()
      const usersData = await backend.users()
      if (ticketsData && usersData) {
        setIsLoading(false)
      }
      setTickets(ticketsData)
      setUsers(usersData)
    } catch (err) {
      setIsError(true)
      setErrorMessage(err.message)
    }
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsError(false)
      setErrorMessage("")
    }, 5000)
  }, [isError])

  const setError =(message: string) => {
    setIsError(true)
    setErrorMessage(message)
  }


  const deleteTicket = (id: number) => {
    try {
      setTickets(tickets.filter(ticket => ticket.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  
  const addTicket = async (opt: Pick<Ticket, "description">) => {
    try {
      setIsLoading(true)
      await backend.newTicket(opt)
      setIsLoading(false)
      console.log("added")
      getDataFromApi()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateTicket = (opt: Ticket) => {
    if (opt.description === "") {
      return
    }
    try {
      const findTicket = tickets.find(ticket => ticket.id === opt.id)
      if (findTicket) {
        findTicket.description = opt.description
        setTickets(
          tickets.map(ticket => {
            if (ticket.id === findTicket.id) {
              return findTicket
            }
            return ticket
          })
        )
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const setTicketId = (ticket: ticketsTypes) => {
    try {
      setSelectedTicket(ticket)
    } catch (err) {
      setError(err.message)
    }
  }

  const setCompleted = async (opt: ticketsTypes) => {
    try {
      await backend.complete(opt)
      const findTicket = tickets.find(ticket => ticket.id === opt.id)
      if (findTicket) {
        findTicket.completed = opt.completed
        setTickets(
          tickets.map(ticket => {
            if (ticket.id === findTicket.id) {
              return findTicket
            }
            return ticket
          })
        )
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const sortBy = (callback: Function) => {
    try {
      const sortArr = tickets.sort(callback).map((item: ticketsTypes) => item)
      setTickets(sortArr)
    } catch (err) {
      setError(err.message)
    }
  }

  const assignUser = (userId: number) => {
    console.log(userId)
  }

  return (
    <TicketContext.Provider
      value={{
        tickets,
        users,
        isLoading,
        deleteTicket,
        addTicket,
        updateTicket,
        selectedTicket,
        setTicketId,
        setCompleted,
        sortBy,
        assignUser,
        isError,
        errorMessage,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}
export default TicketContext
export { TicketProvider }
