import React, { useContext } from "react"
import Checkbox from "@material-ui/core/Checkbox"
import AppContext from "../context/AppContext"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const AssignUser: React.FC = ({ ticket }: any) => {
  const classes = useStyles()
  const [age, setAge] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const { users, setAssignUserToTicket, loadingData } = useContext(AppContext)

  const handleChange = (e: React.ChangeEvent) => {
    setAge(e.target.value)
    setAssignUserToTicket({ ticketId: ticket.id, assigneeId: e.target.value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select">User</InputLabel>
        <Select
          disabled={loadingData}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age || ticket.assigneeId}
          onChange={handleChange}
          inputProps={{
            name: "users",
            id: "open-select",
          }}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  )
}

export default AssignUser
