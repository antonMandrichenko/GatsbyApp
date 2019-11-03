import React, { useContext } from "react"
import TextField from "@material-ui/core/TextField"
import AppContext from "../context/AppContext"

const FilterTickets: React.FC = () => {
  const { setFilter, loadingData } = useContext(AppContext)

  return (
    <TextField
    disabled={loadingData}
      id="filter"
      label="Filter"
      onChange={(e: React.ChangeEvent<Element>) => {
        setFilter(e.target.value)
      }}
    />
  )
}

export default FilterTickets
