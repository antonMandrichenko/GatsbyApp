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
}

const AppContext = React.createContext({} as defaultContextTypes)

const AppProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState([])
  const [tickets, setTickets] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState({ isError: false, message: "" })

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

  return (
    <AppContext.Provider
      value={{
        tickets,
        users,
        error,
        loadingData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContext

export { AppProvider }
