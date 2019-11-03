import React, { useState, useEffect } from "react"
import { BackendService } from "../server/backend.service"

const api = new BackendService()

type ticketFunc = ReturnType<typeof api["ticket"]>
type TicketResolve = NonNullable<Parameters<ticketFunc["then"]>[0]>
type ticketsTypes = Parameters<TicketResolve>[0]

type userFunc = ReturnType<typeof api["user"]>
type UserResolve = NonNullable<Parameters<userFunc["then"]>[0]>
type usersTypes = Parameters<UserResolve>[0]

type errorTypes = {
  isError: boolean
  message: string
}

interface defaultContextTypes {
  tickets: Array<ticketsTypes>
  users: Array<usersTypes>
  loadingData: boolean
  error: errorTypes
  addedTicketToList: Function
  setFilter: Function
  filterText: string
  setCompleteTicket: Function
  setAssignUserToTicket: Function
  getTicket: Function
  ticket: ticketsTypes
  user: usersTypes
  clearError: Function
}

const AppContext = React.createContext({} as defaultContextTypes)

const AppProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState([])
  const [tickets, setTickets] = useState<Array<ticketsTypes>>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState({ isError: false, message: "" })
  const [filterText, setFilterText] = useState("")
  const [ticket, setTicket] = useState<ticketsTypes>(undefined)
  const [user, setUser] = useState<usersTypes>(undefined)

  const loadData = async () => {
    try {
      setLoadingData(true)
      const tickets = await api.tickets()
      const users = await api.users()
      setTickets(tickets)
      setUsers(users)
    } catch (error) {
      setError({ isError: true, message: error.message })
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const addedTicketToList = async (data: ticketsTypes) => {
    try {
      if (data) {
        setLoadingData(true)
        await api.newTicket(data)
        await loadData()
      }
    } catch (err) {
      setError({ isError: true, message: error.message })
    } finally {
      setLoadingData(false)
    }
  }

  const setFilter = (textFilter: string) => {
    setFilterText(textFilter)
  }

  const changeTickets = (current: ticketsTypes) => {
    if (current) {
      setTickets(
        tickets.map((ticket: ticketsTypes) =>
          ticket && ticket.id === current.id ? current : ticket
        )
      )
    }
  }

  const changeData = async (callback: Function, data: ticketsTypes) => {
    try {
      setLoadingData(true)
      const currentTicket = await callback(data)
      changeTickets(currentTicket)
    } catch (error) {
      setError({ isError: true, message: error.message })
    } finally {
      setLoadingData(false)
    }
  }

  const setCompleteTicket = async (data: ticketsTypes) => {
    await changeData(api.complete, data)
  }

  const setAssignUserToTicket = async (data: ticketsTypes) => {
    await changeData(api.assign, data)
  }

  const getTicket = async (id: number) => {
    try {
      setLoadingData(true)
      const currentTicket = await api.ticket(id)
      setTicket(currentTicket)
      if (currentTicket && currentTicket.assigneeId) {
        const currentUser = await api.user(currentTicket.assigneeId)
        setUser(currentUser)
      }
    } catch (error) {
      setError({ isError: true, message: error.message })
    } finally {
      setLoadingData(false)
    }
  }

  const clearError = () => {
    setError({ isError: false, message: ""})
  }

  return (
    <AppContext.Provider
      value={{
        tickets,
        users,
        error,
        loadingData,
        addedTicketToList,
        filterText,
        setFilter,
        setCompleteTicket,
        setAssignUserToTicket,
        getTicket,
        ticket,
        user,
        clearError
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContext

export { AppProvider }
